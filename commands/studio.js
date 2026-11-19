// commands/studio.js
module.exports = async (sock, msg, from, prefix) => {
  const studioText = `
🫧 **Ᏸ.Ꮥ.CᎧᎷᎮᏗᏁᎩ 𝙱𝚄𝙻𝙻𝙴 𝚂𝚃𝚄𝙳𝙸𝙾 𝙲𝙾𝙼𝙿𝙰𝙽🇾**

◦ 🫧 ───── 🫧 ◦

**𝙌𝙐𝙄 𝙎𝙊𝙈𝙈𝙀𝙎-𝙉𝙊𝙐𝙎 ?**
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
*(Plus d'œuvres sur notre site)*

✍️ **BULLART** • Concours de création (BullArt 3 : inscriptions ouvertes)
🏆 **BULLE AWARDS** • Nominations & cérémonie

◦ 🫧 ───── 🫧 ◦

**𝙲𝙾𝙽𝚃𝙰𝙲𝚃 & 𝙴𝚂𝙿𝙰𝙲𝙴𝚂**
🫧 **Mascotte (Bullo) :** https://wa.me/242067976488
📬 **Boîte aux lettres :** https://tinyurl.com/BscSend
🎉 **Groupe Événementiel :** https://chat.whatsapp.com/IJPoVGFUUFT5L97bl50Ido
📧 **Avis :** Bullestudiocompany@gmail.com

◦ 🫧 ───── 🫧 ◦

**𝙽𝙾𝚂 𝙿𝙻𝙰𝚃𝙴𝙵𝙾𝚁𝙼𝙴𝚂**
🌐 **Site :** https://bscompany.vercel.app/
🎵 **TikTok :** tiktok.com/@bscompany_officiel
💬 **WhatsApp :** Chaîne officielle
📚 **Wattpad & WebNovel**

*Tape ${prefix}menu pour voir les commandes.*
  `.trim();

  await sock.sendMessage(from, { text: studioText }, { quoted: msg });
};

