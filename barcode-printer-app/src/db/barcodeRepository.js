const db = require('./config');

async function logBarcode(barcode) {
  const pool = await db;
  await pool.request()
    .input('barcode', barcode)
    .query('INSERT INTO BarcodeLogs (barcode) VALUES (@barcode)');
}

module.exports = { logBarcode };
