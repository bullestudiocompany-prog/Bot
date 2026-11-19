const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');

// CONFIGURATION DU PRÉFIXE
const PREFIX = "😑"; 

// Importation des commandes externes
const menuCommand = require('./commands/menu');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  const sock = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  });

  if (!sock.authState.creds.registered) {
    const phoneNumber = await question("Entrez le numéro WhatsApp du bot (indicatif pays, sans +, ex: 242061234567) : ");
    const code = await sock.requestPairingCode(phoneNumber.trim());
    console.log(`\n🔑 VOTRE CODE DE JUMELAGE : ${code}\n`);
    console.log("Allez dans WhatsApp > Paramètres > Appareils connectés > Connecter un appareil > Connecter avec le numéro de téléphone.");
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connexion fermée. Reconnexion :', shouldReconnect);
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ Bot WhatsApp connecté avec le préfixe 😑 !');
    }
  });

  // ÉCOUTE DES MESSAGES
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    // Vérifier si le message commence par le préfixe 😑
    if (!text.startsWith(PREFIX)) return;

    const args = text.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`[COMMANDE] : ${command}`);

    // Commande menu / aide
    if (command === 'menu' || command === 'aide') {
      await menuCommand(sock, msg, from, PREFIX);
    }
    
    // Commande ping
    else if (command === 'ping') {
      await sock.sendMessage(from, { text: "🏓 Pong avec le sourire 😑 !" }, { quoted: msg });
    }

    // Commande info
    else if (command === 'info') {
      await sock.sendMessage(from, { text: "🤖 Bot structuré proprement avec un code organisé." }, { quoted: msg });
    }
  });
}

startBot();

