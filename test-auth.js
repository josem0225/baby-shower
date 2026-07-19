const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n');
for (const line of env) {
  if (line.includes('=')) {
    const [key, ...val] = line.split('=');
    process.env[key.trim()] = val.join('=').trim();
  }
}
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

async function run() {
  try {
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
    
    if (!GOOGLE_CLIENT_EMAIL) throw new Error("No env vars");

    let privateKey = GOOGLE_PRIVATE_KEY.replace(/^"|"$/g, '');
    privateKey = privateKey.replace(/\\n/g, '\n');
    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL.replace(/^"|"$/g, ''),
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID.replace(/^"|"$/g, ''), serviceAccountAuth);
    await doc.loadInfo();
    
    console.log("📌 Hojas encontradas:", Object.values(doc.sheetsById).map(s => s.title));
    
    let sheet = Object.values(doc.sheetsById).find(s => s.title.toLowerCase().includes('invitad'));
    if (!sheet) {
      console.log("⚠️ No se encontró hoja 'invitados', usando la primera.");
      sheet = doc.sheetsByIndex[0];
    }
    
    console.log("📌 Usando hoja:", sheet.title);
    const rows = await sheet.getRows();
    console.log(`📌 Filas encontradas: ${rows.length}`);
    
    if (rows.length > 0) {
      console.log("📌 Ejemplo de las primeras 5 filas (RAW DATA):");
      for(let i = 0; i < Math.min(5, rows.length); i++) {
        console.log(`Fila ${i}:`, rows[i]._rawData);
      }
    }

    const phone = '3058886883';
    console.log(`📌 Buscando teléfono: ${phone}`);
    
    let match = false;
    for (const row of rows) {
      const rowData = row._rawData;
      for (const cell of rowData) {
        const cellValue = String(cell).replace(/\D/g, '');
        if (cellValue.length >= 7 && cellValue.includes(phone)) {
          console.log("✅ ¡MATCH ENCONTRADO!", rowData);
          match = true;
          break;
        }
      }
      if (match) break;
    }
    
    if (!match) {
      console.log("❌ NO SE ENCONTRÓ EL TELÉFONO");
    }
  } catch(e) {
    console.error("❌ Error:", e);
  }
}
run();
