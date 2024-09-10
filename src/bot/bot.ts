import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
    ctx.reply('Привет! Добро пожаловать в наш бот! Нажмите кнопку ниже, чтобы получить доступ к приложению',
        Markup.inlineKeyboard([
            Markup.button.webApp('Вход в приложение', process.env.WEBAPP_URL)
        ])
    );
});

bot.launch(() => console.log('Bot launched!'));