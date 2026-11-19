const fs = require('fs');

module.exports = async (sock, msg, from, prefix) => {
  const studioCaption = `
🫧 **Ᏸ.Ꮥ.CᎧᎷᎮᏗᏁᎩ 𝙱𝚄𝙻𝙻𝙴 𝚂𝚃𝚄𝙳𝙸𝙾 𝙲𝙾𝙼𝙿𝙰𝙽𝚈**

◦ 🫧 ───── 🫧 ◦
*Studio créatif africain*
🌐 https://bscompany.vercel.app/
  `.trim();

  try {
    // Si Logo.jpg est dans un dossier "media", mets './media/Logo.jpg'
    // S'il est à la racine, laisse './Logo.jpg'
    await sock.sendMessage(from, { 
      image: fs.readFileSync('../media/Logo.jpg'), 
      caption: studioCaption 
    }, { quoted: msg });
  } catch (error) {
    console.error("Erreur image studio :", error);
    await sock.sendMessage(from, { text: studioCaption }, { quoted: msg });
  }
};
