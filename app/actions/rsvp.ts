'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function confirmRsvp(phoneNumber: string, isAttending: boolean) {
  try {
    const GOOGLE_CLIENT_EMAIL = (process.env.GOOGLE_CLIENT_EMAIL || '').replace(/^"|"$/g, '');
    const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/^"|"$/g, '');
    const SPREADSHEET_ID = (process.env.SPREADSHEET_ID || '').replace(/^"|"$/g, '');

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !SPREADSHEET_ID) {
      return { success: false, error: "Error de configuración del servidor." };
    }

    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    // Usamos el scope que permite escritura
    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    // Buscar la hoja de invitados de forma segura
    let sheet = Object.values(doc.sheetsById).find(s => s.title.toLowerCase().includes('invitad'));
    if (!sheet) {
      sheet = doc.sheetsByIndex[0];
    }

    // Cargar los encabezados para asegurar que exista la columna Confirmacion
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    if (!headers.includes('Confirmacion')) {
      // Si la columna no existe, se la añadimos a los encabezados
      await sheet.setHeaderRow([...headers, 'Confirmacion']);
    }

    const rows = await sheet.getRows();
    const cleanInputPhone = phoneNumber.replace(/\D/g, '');
    let guestRow = null;

    for (const row of rows) {
      const rowData = (row as unknown as { _rawData: string[] })._rawData || [];
      for (const cell of rowData) {
        const cellValue = String(cell).replace(/\D/g, '');
        if (cellValue.length >= 7 && cellValue.includes(cleanInputPhone)) {
          guestRow = row;
          break;
        }
      }
      if (guestRow) break;
    }

    if (guestRow) {
      guestRow.set('Confirmacion', isAttending ? 'Sí asiste' : 'No asiste');
      await guestRow.save();
      return { success: true };
    }

    return { success: false, error: "No se encontró tu número para confirmar." };
  } catch (error) {
    console.error("Error guardando confirmación en Google Sheets:", error);
    return { success: false, error: "Ocurrió un error guardando tu respuesta." };
  }
}
