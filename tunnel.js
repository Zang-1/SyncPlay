const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
  try {
    const tunnel = await localtunnel({ port: 8000 });
    fs.writeFileSync('tunnel_output.txt', tunnel.url);
    console.log("Tunnel is open at: " + tunnel.url);
    tunnel.on('close', () => {
      console.log("Tunnel closed");
    });
  } catch (err) {
    fs.writeFileSync('tunnel_output.txt', "ERROR: " + err.message);
  }
})();
