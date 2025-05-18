const express = require('express');
const router = express.Router();
const { sendToPrinter } = require('../printer/printerService');
const { logBarcode } = require('../db/barcodeRepository');

const PRINTER_IP = process.env.PRINTER_IP;

router.post('/print', async (req, res) => {
  const { baseBarcode, quantity } = req.body;

  try {
    let allPrinted = [];

    for (let i = 0; i < quantity; i++) {
      const padded = (i + 1).toString().padStart(6, '0');
      const fullBarcode = `${baseBarcode}${padded}`;

      for (let j = 0; j < 7; j++) {
        await sendToPrinter(fullBarcode, PRINTER_IP);
        await logBarcode(fullBarcode);
        allPrinted.push(fullBarcode);
      }

      const withG = fullBarcode + 'G';
      await sendToPrinter(withG, PRINTER_IP);
      await logBarcode(withG);
      allPrinted.push(withG);
    }

    res.json({ success: true, printed: allPrinted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Print failed' });
  }
});

module.exports = router;
