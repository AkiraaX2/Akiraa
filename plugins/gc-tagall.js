const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
let oi = `*🐌@xs.akiraa* ${pesan}`
let teks = `*🦋𝐃𝐄𝐒𝐏𝐈𝐄𝐑𝐓𝐄𝐍 𝐂𝐑𝐈𝐀𝐓𝐔𝐑𝐈𝐓𝐀𝐒 𝐃𝐄𝐋 𝐒𝐄Ñ𝐎𝐑*\n\n${oi}\n*𝕸𝖊𝖓𝖈𝖎𝖔𝖓𝖊𝖘*\n`
for (let mem of participants) {
teks += `🗣️ @${mem.id.split('@')[0]}\n`}
teks += `🐒𝘈𝘬𝘪𝘳𝘢𝘢𝘉𝘰𝘵`
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['tagall <mesaje>', 'invocar <mesaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
export default handler;
