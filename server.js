// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // node-fetch@2

const app = express();
const PORT = 3000;

// Vervang hier met jouw Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1441828585928261704/qm0A6B-oWgv775XxeZ2PpKy6BvYWOlbIf0bg6-W1iki2fULv3WRkzEmAxzw90FQdqoKY';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// POST route voor het formulier
app.post('/gang-aanvraag', async (req, res) => {
    const {
        naam,
        servers,
        watIsRP,
        belangrijkeRP,
        motivatie,
        langeTermijn,
        conflicten,
        beschikbaarheid,
        speelstijl,
        extraMotivatie
    } = req.body;

    // Debug: zie wat binnenkomt
    console.log('Formulier ontvangen:', req.body);

    // Bericht dat naar Discord gaat
    const content = `
**Nieuwe Sinaloa Gang Aanvraag**
👤 Naam: ${naam}
🌐 Vorige servers & rol: ${servers}
💡 Wat betekent RP voor jou: ${watIsRP}
⚙️ Wat vind je belangrijk in goede gang-RP: ${belangrijkeRP}
🧾 Motivatie: ${motivatie}
🔁 Lange termijn actief: ${langeTermijn}
🧠 Omgaan met conflicten: ${conflicten}
📆 Beschikbaarheid: ${beschikbaarheid}
🎭 Speelstijl: ${speelstijl}
🧾 Extra motivatie: ${extraMotivatie}
`;

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content })
        });
        res.send('<h2>Formulier succesvol verzonden!</h2>');
    } catch (err) {
        console.error('Fout bij verzenden naar Discord:', err);
        res.status(500).send('Er is iets misgegaan bij het verzenden.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});
