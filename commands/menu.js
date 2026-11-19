const fs = require('fs');

module.exports = async (sock, msg, from, prefix) => {
  const menuText = `
╭━━━ 🫧 *MENU BSCOMPANY* 🫧 ━━━╮
┃
┃ 👋 Bienvenue dans la bulle ! 
┃ Voici nos commandes :
┃
┃ 📌 *${prefix}studio* - Présentation du studio
┃ 📌 *${prefix}ping* - Teste la rapidité du bot
┃ 📌 *${prefix}menu* - Affiche ce menu
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*Studio Créatif Africain 🚀*
  `.trim();

  try {
    // Envoi de la vidéo locale intro.mp4
    await sock.sendMessage(from, { 
      video: fs.readFileSync('../media/intro.mp4'), 
      caption: menuText,
      gifPlayback: false // Mets à true si tu veux que la vidéo se lise en boucle comme un GIF
    }, { quoted: msg });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la vidéo :", error);
    await sock.sendMessage(from, { text: menuText }, { quoted: msg });
  }
};

