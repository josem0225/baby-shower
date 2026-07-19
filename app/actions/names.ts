'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { revalidatePath } from 'next/cache';

async function getSheet() {
  const GOOGLE_CLIENT_EMAIL = (process.env.GOOGLE_CLIENT_EMAIL || '').replace(/^"|"$/g, '');
  const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/^"|"$/g, '');
  const SPREADSHEET_ID = (process.env.SPREADSHEET_ID || '').replace(/^"|"$/g, '');
  
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
    throw new Error("Faltan variables de entorno para GCP.");
  }

  const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
  const serviceAccountAuth = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  // Buscar la hoja que se llame "Nombres" o "nombres"
  let sheet = Object.values(doc.sheetsById).find(s => s.title.toLowerCase() === 'nombres');
  
  if (!sheet) {
    // Si no existe, crearla
    sheet = await doc.addSheet({ title: 'Nombres', headerValues: ['Nombre', 'Votos'] });
  } else {
    // Asegurarse de que tenga los encabezados correctos
    await sheet.loadHeaderRow().catch(async () => {
      await sheet?.setHeaderRow(['Nombre', 'Votos']);
    });
  }

  return sheet;
}

export type NameEntry = { id: string, name: string, votes: number };

export async function getNames(): Promise<{ success: boolean; data?: NameEntry[]; error?: string }> {
  try {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    
    const namesList: NameEntry[] = rows.map(row => ({
      id: row.rowNumber.toString(),
      name: row.get('Nombre') || 'Desconocido',
      votes: parseInt(row.get('Votos')) || 0
    }));

    // Ordenar de mayor a menor votos
    namesList.sort((a, b) => b.votes - a.votes);

    return { success: true, data: namesList };
  } catch (error) {
    console.error("Error obteniendo nombres:", error);
    return { success: false, error: "No se pudieron cargar los nombres." };
  }
}

export async function voteName(rawName: string, remove: boolean = false): Promise<{ success: boolean; data?: NameEntry[]; error?: string }> {
  try {
    const sheet = await getSheet();
    const cleanName = rawName.trim().toUpperCase();
    if (!cleanName) return { success: false, error: "Nombre inválido." };

    const rows = await sheet.getRows();
    
    // Buscar si el nombre ya existe
    let existingRow = null;
    for (const row of rows) {
      if ((row.get('Nombre') || '').trim().toUpperCase() === cleanName) {
        existingRow = row;
        break;
      }
    }

    if (existingRow) {
      // Sumar o restar un voto
      const currentVotes = parseInt(existingRow.get('Votos')) || 0;
      const newVotes = remove ? Math.max(0, currentVotes - 1) : currentVotes + 1;
      existingRow.set('Votos', newVotes);
      await existingRow.save();
    } else if (!remove) {
      // Crear nueva fila solo si estamos sumando
      await sheet.addRow({ Nombre: cleanName, Votos: 1 });
    }

    // Devolver la lista actualizada reordenada
    revalidatePath('/'); // Forzar limpieza de cache si la hay
    return await getNames();

  } catch (error) {
    console.error("Error votando por nombre:", error);
    return { success: false, error: "Ocurrió un error guardando el voto." };
  }
}
