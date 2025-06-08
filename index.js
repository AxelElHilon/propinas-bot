require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
const dayjs = require('dayjs');
require('dayjs/locale/es');
dayjs.locale('es');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});


const sheetId = process.env.SHEET_ID;

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const montoMatch = text.match(/\$?(\d{2,7})/);
  const zonaMatch = text.match(/en (.+?)(?:,|$)/i);
  const notaMatch = text.match(/nota:(.+)/i);

  if (!montoMatch || !zonaMatch) {
    bot.sendMessage(chatId, 'Usá el formato: "$2500 en Devoto, nota: lluvia"');
    return;
  }

  const monto = montoMatch[1];
  const zona = zonaMatch[1].trim();
  const nota = notaMatch ? notaMatch[1].trim() : '-';

  const fecha = dayjs().format('DD/MM/YYYY');
  const dia = dayjs().format('dddd');

  const row = [fecha, dia, zona, monto, nota];

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'A1:E1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [row],
    },
  });

  bot.sendMessage(chatId, `✅ Registrado: $${monto} en ${zona} (${dia})`);
});
