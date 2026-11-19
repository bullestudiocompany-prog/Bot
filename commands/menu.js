// commands/menu.js
module.exports = async (sock, msg, from, prefix) => {
  const menuText = `
╭━━━ 🫧 *MENU BSCOMPANY* 🫧 ━━━╮
┃
┃ 👋 Bienvenue dans la bulle ! 
┃ Voici mes commandes :
┃
┃ 📌 *${prefix}studio* - Présentation du studio
┃ 📌 *${prefix}ping* - Teste la rapidité du bot
┃ 📌 *${prefix}menu* - Affiche ce menu
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*Studio Créatif Africain 🚀*
  `.trim();

  await sock.sendMessage(from, { text: menuText }, { quoted: msg });
};

