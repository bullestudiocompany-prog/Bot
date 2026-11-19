const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🫧 BSCompany Bot est bien en ligne !');
});

app.listen(PORT, () => {
  console.log(`Serveur web prêt sur le port ${PORT}`);
});


// CONFIGURATION DU PRÉFIXE EN EMOJI BULLE
const PREFIX = "🫧"; 

// Importation des fichiers de commandes
const menuCommand = require('./commands/menu');
const studioCommand = require('./commands/studio');
const hidetagCommand =('./commands/hidetag');

// ... (dans ton écouteur de messages, là où tu gères les commandes) :

    // Commande hidetag / tagall
    else if (command === 'hidetag' || command === 'tag') {
      await hidetagCommand(sock, msg, from, PREFIX, args);
    }


async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  const sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connexion fermée. Reconnexion :', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ Bot WhatsApp connecté avec le préfixe 🫧 !');
    }
  });

  
  // ÉCOUTE DES MESSAGES
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    // Vérifier si le message commence par le préfixe 🫧
    if (!text.startsWith(PREFIX)) return;

    const args = text.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`[COMMANDE] : ${command}`);

    // Commande menu
    if (command === 'menu' || command === 'aide') {
      await menuCommand(sock, msg, from, PREFIX);
    }
    
    // Commande studio / bio
    else if (command === 'studio' || command === 'bio' || command === 'bscompany') {
      await studioCommand(sock, msg, from, PREFIX);
    }

    // Commande ping
    else if (command === 'ping') {
      await sock.sendMessage(from, { text: "🏓 Pong ! La bulle répond instantanément 🫧." }, { quoted: msg });
    }
  });
}


startBot();

