// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());                 // tu peux restreindre plus tard
app.use(express.json());         // parse JSON

// Transport SMTP Gandi (port 465 SSL recommandé)
const transporter = nodemailer.createTransport({
  host: 'mail.gandi.net',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@syloria.eu',
    pass: process.env.SMTP_PASS, // défini dans .env
  },
});

// (optionnel) vérifier la connexion SMTP au démarrage
transporter.verify((err, ok) => {
  if (err) console.error('❌ SMTP error:', err);
  else console.log('✅ SMTP prêt');
});

// Endpoint: POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', company = '', service = '', other = '' } = req.body || {};
  if (!name || !email || !service) {
    return res.status(400).json({ success: false, error: 'Champs requis manquants' });
  }

  try {
    await transporter.sendMail({
      from: `"Site Syloria" <contact@syloria.eu>`,
      to: 'contact@syloria.eu',
      replyTo: email,
      subject: `📩 Nouvelle demande de contact — ${name}`,
      text:
`Nom: ${name}
Email: ${email}
Entreprise: ${company}

Service choisi: ${service}
Autre précision: ${other || '(aucune)'}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Envoi email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});



const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 API Contact sur http://localhost:${PORT}`));

