// commands/hidetag.js
module.exports = async (sock, msg, from, prefix, args) => {
  // Vérifier si le message vient bien d'un groupe
  if (!from.endsWith('@g.us')) {
    await sock.sendMessage(from, { text: "❌ Cette commande ne peut être utilisée que dans un groupe !" }, { quoted: msg });
    return;
  }

  try {
    // Récupérer les informations du groupe pour avoir la liste des membres
    const groupMetadata = await sock.groupMetadata(from);
    const participants = groupMetadata.participants;
    const mem = participants.map(u => u.id);

    // Le message à diffuser (soit les arguments tapés après la commande, soit un texte par défaut)
    const textMessage = args.join(" ") || "📢 Annonce importante de BSCompany !";

    // Envoyer le message en taguant invisiblement tout le monde
    await sock.sendMessage(from, { 
      text: `🫧 *ANNONCE BSCOMPANY* 🫧\n\n${textMessage}`, 
      mentions: mem 
    }, { quoted: msg });

  } catch (error) {
    console.error("Erreur hidetag :", error);
    await sock.sendMessage(from, { text: "❌ Impossible d'exécuter la commande hidetag dans ce groupe." }, { quoted: msg });
  }
};
