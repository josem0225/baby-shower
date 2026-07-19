'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Esta función se ejecuta de forma segura en el servidor de Next.js
export async function verifyGuest(phoneNumber: string) {
  try {
    const GOOGLE_CLIENT_EMAIL = (process.env.GOOGLE_CLIENT_EMAIL || '').replace(/^"|"$/g, '');
    const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/^"|"$/g, '');
    const SPREADSHEET_ID = (process.env.SPREADSHEET_ID || '').replace(/^"|"$/g, '');

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      console.error("Faltan variables de entorno para GCP.");
      return { success: false, error: "Error de configuración del servidor. Faltan claves." };
    }

    // Limpiar la clave privada (los saltos de línea \n en variables de entorno a veces se escapan)
    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    // Inicializar auth de Google
    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    
    // Cargar la información del documento
    await doc.loadInfo();
    
    // Buscar la hoja de invitados por nombre, sin importar mayúsculas/minúsculas
    let sheet = Object.values(doc.sheetsById).find(s => s.title.toLowerCase().includes('invitad'));
    if (!sheet) {
      sheet = doc.sheetsByIndex[0]; // Fallback a la primera hoja
    }

    // Cargar las filas
    const rows = await sheet.getRows();

    // Limpiar el número de teléfono ingresado (quitar espacios, guiones)
    const cleanInputPhone = phoneNumber.replace(/\D/g, '');

    // Buscar en todas las filas si el número existe
    let foundGuest = null;

    for (const row of rows) {
      const rowData = (row as unknown as { _rawData: string[] })._rawData || [];
      
      for (const cell of rowData) {
        const cellValue = String(cell).replace(/\D/g, ''); 
        
        if (cellValue.length >= 7 && cellValue.includes(cleanInputPhone)) {
          foundGuest = row;
          break;
        }
      }
      if (foundGuest) break;
    }

    if (foundGuest) {
      const rawValues = (foundGuest as unknown as { _rawData: string[] })._rawData || [];
      let guestName = 'Invitado Especial';
      
      // El nombre normalmente está en la Columna B (índice 1)
      if (rawValues.length >= 2 && String(rawValues[1]).trim() !== '') {
        guestName = String(rawValues[1]).trim();
      } else {
        // Fallback: la primera columna que tenga texto con letras
        const textCol = rawValues.find((v: string) => /[A-Za-z]/.test(v));
        if (textCol) guestName = textCol.trim();
      }

      return { success: true, guestName };
    } else {
      return { success: false, error: "No encontramos tu número en la lista de invitados." };
    }

  } catch (error) {
    console.error("Error validando en Google Sheets:", error);
    return { success: false, error: "Ocurrió un error al intentar verificar el número. Intenta más tarde." };
  }
}
