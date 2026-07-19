'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Esta función se ejecuta de forma segura en el servidor de Next.js
export async function verifyGuest(phoneNumber: string) {
  try {
    const {
      GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      SPREADSHEET_ID,
    } = process.env;

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
    const sheet = doc.sheetsByIndex[0]; // Usamos la primera hoja por defecto

    // Cargar las filas
    const rows = await sheet.getRows();

    // Limpiar el número de teléfono ingresado (quitar espacios, guiones)
    const cleanInputPhone = phoneNumber.replace(/\D/g, '');

    // Buscar en todas las filas si el número existe
    let foundGuest = null;

    for (const row of rows) {
      // row.toObject() nos da todos los valores de la fila
      const rowData = row.toObject();
      
      // Revisamos todas las celdas de esta fila
      for (const key in rowData) {
        const cellValue = String(rowData[key]).replace(/\D/g, ''); // Limpiar el valor de la celda
        
        // Si el valor limpiado incluye o es exactamente el teléfono ingresado
        if (cellValue.length >= 7 && cellValue.includes(cleanInputPhone)) {
          foundGuest = rowData;
          break;
        }
      }
      if (foundGuest) break;
    }

    if (foundGuest) {
      // Intentar obtener el nombre si existe una columna que se parezca a Nombre o Invitado
      const nameKey = Object.keys(foundGuest).find(k => k.toLowerCase().includes('nombre') || k.toLowerCase().includes('invitado'));
      const guestName = nameKey ? foundGuest[nameKey] : 'Invitado VIP';

      return { success: true, guestName };
    } else {
      return { success: false, error: "No encontramos tu número en la lista de invitados." };
    }

  } catch (error) {
    console.error("Error validando en Google Sheets:", error);
    return { success: false, error: "Ocurrió un error al intentar verificar el número. Intenta más tarde." };
  }
}
