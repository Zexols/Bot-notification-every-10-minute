const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
//Если что вводите свой токен от бота в файл .env
const token = process.env.Telegram_token;
const bot = new TelegramBot(token, {
  polling: true,
});
const { Normal, Toxic } = require("./data.js");
function Norma(msg) {
  return setInterval(() => {
    const randomIndex = Math.floor(Math.random() * Normal.length);
    const text = Normal[randomIndex];

    bot.sendMessage(msg.chat.id, text);
  }, 300000);
}
function Toxicity(msg) {
  return setInterval(() => {
    const randomIndex = Math.floor(Math.random() * Toxic.length);
    const text = Toxic[randomIndex];
    bot.sendMessage(msg.chat.id, text);
  }, 300000);
}
bot.on("message", (msg) => {
  if (msg.text === "Обычный😀") {
    return Norma(msg);
  }
  if (msg.text === "Токсичный🤡") {
    return Toxicity(msg);
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Привет, я бот напоминалка для дел!🤩 Буду напоминать сделать дело😋.У бота есть два режима:Обычный😀 и Токсичный🤡 Какой режим хотите выбрать?",
    {
      reply_markup: {
        keyboard: [[{ text: "Обычный😀" }], [{ text: "Токсичный🤡" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
});
