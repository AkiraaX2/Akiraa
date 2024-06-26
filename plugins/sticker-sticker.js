import {sticker} from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import {webp2png} from '../lib/webp2mp4.js';

const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  let stiker = false;
  const user = db.data.users[m.sender];
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp|image|video/g.test(mime)) {
      const img = await q.download?.();
      if (!img) throw `*[❗iຖf໐❗] ʀᴇꜱᴘᴏɴᴅᴇ ᴀ ᴜɴ ᴠɪᴅᴇᴏ, ɪᴍᴀɢᴇɴ ᴏ ɪɴꜱᴇʀᴛᴇ ᴇʟ ᴇɴʟᴀᴄᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴛᴇʀᴍɪɴᴀᴄɪᴏɴ ᴇɴ .ᴊᴘɢ ᴇʟ ᴄᴜᴀʟ ꜱᴇʀᴀ ᴄᴏɴᴠᴇʀᴛɪᴅᴏ ᴇɴ ꜱᴛɪᴄᴋᴇʀ, ᴅᴇʙᴇ ʀᴇꜱᴘᴏɴᴅᴇʀ ᴏ ᴜꜱᴀʀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ${usedPrefix + command}*`;
      let out;
      try {
        stiker = await sticker(img, false, global.packname, global.author);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img);
          else if (/image/g.test(mime)) out = await uploadImage(img);
          else if (/video/g.test(mime)) out = await uploadFile(img);
          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, global.packname, global.author);
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author);
      else return m.reply('*[❗iຖf໐❗] ᴇʟ ᴇɴʟᴀᴄᴇ / ᴜʀʟ / ʟɪɴᴋ ɴᴏ ᴇꜱ ᴠᴀʟɪᴅᴀ, ʟᴀ ᴛᴇʀᴍɪɴᴀᴄɪᴏɴ ᴅᴇʟ ᴇɴʟᴀᴄᴇ / ᴜʀʟ / ʟɪɴᴋ ᴅᴇʙᴇ ꜱᴇʀ .ᴊᴘɢ, ᴇᴊᴇᴍᴘʟᴏ: ${usedPrefix}s https://telegra.ph/file/0dc687c61410765e98de2.jpg*');
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
    else throw '*[❗iຖf໐❗] ᴏᴄᴜʀʀɪᴏ ᴜɴ ᴇʀʀᴏʀ, ᴠᴜᴇʟᴠᴀ ᴀ ɪɴᴛᴇɴᴛᴀʀʟᴏ. ʀᴇꜱᴘᴏɴᴅᴇ ᴀ ᴜɴ ᴠɪᴅᴇᴏ, ɪᴍᴀɢᴇɴ ᴏ ɪɴꜱᴇʀᴛᴇ ᴇʟ ᴇɴʟᴀᴄᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴛᴇʀᴍɪɴᴀᴄɪᴏɴ .ᴊᴘɢ ᴇʟ ᴄᴜᴀʟ ꜱᴇʀᴀ ᴄᴏɴᴠᴇʀᴛɪᴅᴏ ᴇɴ ꜱᴛɪᴄᴋᴇʀ*';
  }
};
handler.help = ['sfull'];
handler.tags = ['sticker'];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;

export default handler;

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};


/* import fetch from 'node-fetch'
import { addExif } from '../lib/sticker.js'
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    let [packname, ...author] = args.join` `.split`|`
    author = (author || []).join`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp/g.test(mime)) {
      let img = await q.download?.()
      stiker = await addExif(img, packname || global.packname, author || global.author)
    } else if (/image/g.test(mime)) {
      let img = await q.download?.()
      stiker = await createSticker(img, false, packname || global.packname, author || global.author)
    } else if (/video/g.test(mime)) {
      let img = await q.download?.()
      stiker = await mp4ToWebp(img, { pack: packname || global.packname, author: author || global.author })
    } else if (args[0] && isUrl(args[0])) {
      stiker = await createstiker(false, args[0], '', author, 20)
    } else throw `*[❗iຖf໐❗] ʀᴇꜱᴘᴏɴᴅᴇ ᴀ ᴜɴ ᴠɪᴅᴇᴏ, ɪᴍᴀɢᴇɴ ᴏ ɪɴꜱᴇʀᴛᴇ ᴇʟ ᴇɴʟᴀᴄᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴛᴇʀᴍɪɴᴀᴄɪᴏɴ ᴇɴ .ᴊᴘɢ ᴇʟ ᴄᴜᴀʟ ꜱᴇʀᴀ ᴄᴏɴᴠᴇʀᴛɪᴅᴏ ᴇɴ ꜱᴛɪᴄᴋᴇʀ, ᴅᴇʙᴇ ʀᴇꜱᴘᴏɴᴅᴇʀ ᴏ ᴜꜱᴀʀ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ ${usedPrefix + command}*`
  } catch (error) {
    console.log(error)
    try {
      let [packname, ...author] = args.join` `.split`|`
      author = (author || []).join`|`
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || q.mediaType || ''
      let img = await q.download?.()
      if (/webp/g.test(mime)) out = await webp2png(img)
      else if (/image/g.test(mime)) out = await uploadImage(img)
      else if (/video/g.test(mime)) out = await uploadFile(img)
      if (typeof out !== 'string') out = await uploadImage(img)
      stiker = await stiker(false, out, global.packname, global.author)
      if (args[0] && isUrl(args[0])) {
        stiker = await stiker(false, args[0], global.packname, global.author)
      } else {
        throw `*[❗iຖf໐❗] ᴇʟ ᴇɴʟᴀᴄᴇ / ᴜʀʟ / ʟɪɴᴋ ɴᴏ ᴇꜱ ᴠᴀʟɪᴅᴀ, ʟᴀ ᴛᴇʀᴍɪɴᴀᴄɪᴏɴ ᴅᴇʟ ᴇɴʟᴀᴄᴇ / ᴜʀʟ / ʟɪɴᴋ ᴅᴇʙᴇ ꜱᴇʀ .ᴊᴘɢ, ᴇᴊᴇᴍᴘʟᴏ: ${usedPrefix}s https://telegra.ph/file/0dc687c61410765e98de2.jpg*`
      }
    } catch (error) {
      stiker = `*[❗iຖf໐❗] ᴏᴄᴜʀʀɪᴏ ᴜɴ ᴇʀʀᴏʀ, ᴠᴜᴇʟᴠᴀ ᴀ ɪɴᴛᴇɴᴛᴀʀʟᴏ. ʀᴇꜱᴘᴏɴᴅᴇ ᴀ ᴜɴ ᴠɪᴅᴇᴏ, ɪᴍᴀɢᴇɴ ᴏ ɪɴꜱᴇʀᴛᴇ ᴇʟ ᴇɴʟᴀᴄᴇ ᴅᴇ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴛᴇʀᴍɪɴᴀᴄɪoɴ .ᴊᴘɢ ᴇʟ ᴄᴜᴀʟ ꜱᴇʀᴀ ᴄᴏɴᴠᴇʀᴛɪᴅᴏ ᴇɴ ꜱᴛɪᴄᴋᴇʀ`
    }
  } finally {
    m.reply(stiker)
  }
}
handler.help = ['sfull']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i
export default handler
const isUrl = (text) => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
async function createSticker(img, url, packName, authorName, quality) {
let stickerMetadata = { type: 'full', pack: packName, author: authorName, quality }
return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()}
async function mp4ToWebp(file, stickerMetadata) {
if (stickerMetadata) {
if (!stickerMetadata.pack) stickerMetadata.pack = '‎'
if (!stickerMetadata.author) stickerMetadata.author = '‎'
if (!stickerMetadata.crop) stickerMetadata.crop = false
} else if (!stickerMetadata) { stickerMetadata = { pack: '‎', author: '‎', crop: false }}
let getBase64 = file.toString('base64')
const Format = { file: `data:video/mp4;base64,${getBase64}`, processOptions: { crop: stickerMetadata?.crop, startTime: '00:00:00.0', endTime: '00:00:7.0', loop: 0 }, stickerMetadata: { ...stickerMetadata }, sessionInfo: { WA_VERSION: '2.2106.5', PAGE_UA: 'WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36', WA_AUTOMATE_VERSION: '3.6.10 UPDATE AVAILABLE: 3.6.11', BROWSER_VERSION: 'HeadlessChrome/88.0.4324.190', OS: 'Windows Server 2016', START_TS: 1614310326309, NUM: '6247', LAUNCH_TIME_MS: 7934, PHONE_VERSION: '2.20.205.16' }, config: { sessionId: 'session', headless: true, qrTimeout: 20, authTimeout: 0, cacheEnabled: false, useChrome: true, killProcessOnBrowserClose: true, throwErrorOnTosBlock: false, chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0'], executablePath: 'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe', skipBrokenMethodsCheck: true, stickerServerEndpoint: true }}
let res = await fetch('https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl', { method: 'post', headers: { Accept: 'application/json, text/plain, /', 'Content-Type': 'application/json;charset=utf-8', }, body: JSON.stringify(Format)})
return Buffer.from((await res.text()).split(';base64,')[1], 'base64')}*/
