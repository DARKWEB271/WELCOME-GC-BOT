importimport { Telegraf, Markup } from 'telegraf';
import express from 'express'; // Dummy server ke liye

const bot = new Telegraf('8819653411:AAGcHAa10b-WFQv6Dp9o5vSx7Ac6-bC6_90');

// Dummy Express server Render ke port timeout error ko fix karne ke liye
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('GURU Welcome Bot is running perfectly!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

bot.start((ctx) => {
    ctx.reply(`Assalam-o-Alaikum ${ctx.from.first_name || 'GURU'}! Mujhe apne group mein add karein taake main naye members ko welcome kar sakoon.`);
});

bot.on('message', (ctx) => {
    if (ctx.message && ctx.message.new_chat_members) {
        const botId = ctx.botInfo.id;
        const groupName = ctx.chat.title || "Group";

        ctx.message.new_chat_members.forEach((member) => {
            if (member.id === botId) return; 

            const firstName = member.first_name || "Member";
            const userId = member.id;
            
            const date = new Date();
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`;

            const welcomeMessage = 
`╔═════♦️WELCOME♦️════╗
║
║   ✨ Welcome To ${groupName} ✨
║
║       ⚠️ ${firstName} ⚠️
║ ═══════════════════
║
║  🔹 Name      : ${firstName}
║  🔹 User ID   : ${userId}
║  🔹 Joined    : ${formattedDate}
║  🔹 Status    : New Member
║
╚═══════════════════╝

╔═════♦️Warning♦️════╗
║
║  ✨ Beware of scammers
║  ✨ Only deal with Owner
║  ✨ No DM without permission
║
╚═══════════════════╝`;

            const inlineKeyboard = Markup.inlineKeyboard([
                [
                    Markup.button.url('GURU ↗️', 'https://t.me/itx_GuRu410'),
                    Markup.button.url('CHANNEL ↗️', 'https://t.me/digitaldon247')
                ]
            ]);

            ctx.reply(welcomeMessage, inlineKeyboard).catch(err => console.log("Sending error:", err));
        });
    }
});

bot.launch().then(() => {
    console.log("⚡ Welcome Bot is active with fully dynamic group name support!");
}).catch((err) => {
    console.error("Failed to launch bot:", err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
