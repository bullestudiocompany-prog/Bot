module.exports = async (sock, msg, from) => {
  await sock.sendMessage(from, { 
    text: "Pong ! 🏓 Mon bot WhatsApp tourne parfaitement depuis Termux." 
  }, { quoted: msg });
};

