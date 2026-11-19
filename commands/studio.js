
const fs = require('fs');

module.exports = async (sock, msg, from, prefix) => {
  const studioCaption = `
🫧 **Ᏸ.Ꮥ.CᎧᎷᎮᏗᏁᎩ 𝙱𝚄𝙻𝙻𝙴 𝚂𝚃𝚄𝙳𝙸𝙾 𝙲𝙾𝙼𝙿𝙰𝙽𝚈**

◦ 🫧 ───── 🫧 ◦

**𝙌𝙐𝙄 𝙎𝙊𝙈𝙈𝙀𝚂-𝙉O𝚄𝚂 ?**
Studio créatif africain, BSCompany réunit auteurs et créateurs pour raconter et illustrer des histoires.
*Fondé le 24 décembre 2025.*

◦ 🫧 ───── 🫧 ◦

**𝙽𝙾𝚂 𝙰𝙲𝚃𝙸𝚅𝙸𝚃É𝚂**
• Création & Collaboration
• Découverte de talents
• **Kazesh** : forme narrative illustrée africaine
• Romans & WebNovels

◦ 🫧 ───── 🫧 ◦

**𝙽𝙾𝚂 𝙷𝙸𝚂𝚃𝙾𝙸𝚁𝙴𝚂**
📖 *L'Ombre du passé*
📖 *Autochtone*

✍️ **BULLART** • Concours de création
🏆 **BULLE AWARDS** • Nominations & cérémonie

🌐 **Site :** https://bscompany.vercel.app/
  `.trim();

  try {
    // Envoi de l'image locale Logo.jpg (assure-toi qu'elle est à la racine ou dans ton dossier)
    await sock.sendMessage(from, { 
      image: fs.readFileSync('./media/Logo.jpg'), 
      caption: studioCaption 
    }, { quoted: msg });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'image :", error);
    await sock.sendMessage(from, { text: studioCaption }, { quoted: msg });
  }
};

