const net = require('net');

function sendToPrinter(barcode, printerIP) {
  return new Promise((resolve, reject) => {
    const zplCommand = `^XA
^FO20,20^BY2^BCN,100,N,N,N
^FD${barcode}^FS
^XZ`;

    const client = net.createConnection({ host: printerIP, port: 9100 }, () => {
      client.write(zplCommand);
      client.end();
    });

    client.on('end', resolve);
    client.on('error', reject);
  });
}

module.exports = { sendToPrinter };
