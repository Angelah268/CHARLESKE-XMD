const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0xjRjB0dkx6L1daYXRZbDZJT1E2VjFEek9YNnFqaERvUlRJV1Q1QmhrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWNTRVczbTE4L1lkMGpydVJ5WE1raU1pR2hOa1djdHpVYVJiWXlMakluYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQ1dMTENXZWZuZWVWaUFMTjVqQ1dNL1d6YlorenhQZFdpaHB2cGhmMFZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPNStlVnNZMTl5S1NiUGc1OGZXY3BIQUNIOTNsS3N4bkFMOG1TZzZrMG5zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFLZ2NXWndlYjRSakE5ZUIxaUVhZzc2dW5reE5jdlY1T0lpc2V6YTBwR3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZXVW85SHdldllLK1UySFhzQkNaQzVyTElzd3RZem8raFBEUTJGeFkwQU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk0yQy9JUUNzUDczTzMvMHBBRFVPT1FlVVg3ekQ5SVZoNkQ3MVJBMlFFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicm1UYVg3ZkM0RUExa203bGl1ajFmallzRE5XbUFvNTc2M3dpeHN5RXhGMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhvUlphMExCZzVVZEhaYmV6Wkt5NTluVURVc2ZKRDlWb0xBUnAzSlJjQm9VVHFFeG9rMFlqbjRNTFcxbXd3UDBNM09mZVdqdDdmU3JUVVY4MVlJb0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiJSVm1CNkxwcVU4NnZnVWY1NlRmWUV1LzdTOERSTVFoQ1QwcnlIOVhySmlvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc4NTc2MDUwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2MUVFMTJDQjYxOUIzOUM3MDkwMkFEQUMxRDhBQTRCRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5OTE1MDc5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3ODU3NjA1MDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNkEyOTc4RTQzNDFFRDNERTJBRDQzODZDQzhCOUJFMjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTkxNTA3OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI1NDc4NTc2MDUwNzoyOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjY2OTY3NjY2OTY2NTUyOjI5QGxpZCIsIm5hbWUiOiLDgEzCt0zDgU3DgsWKw5gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01TRXc0TUZFSytydHNJR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlBKZE1QdnZEVFpCVVpuNzFUeHhUejhLRXNzb0hzSFhXMUl6amFqang5Q2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRRSDRCTG5lUDRGWmVtczdBNnd1UGdEYUdHSVdMV0VnZHI1cXJtLzcxcHU4Zk9jeXkvQ2xFWk10QkJPcE4wQlBXQnVOMzVqWFBXOGM2L2FXNkZyTERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUTDZxQTNzWDFlNkw1cjJoQ2ZTSDNJcmdSSzFsdGMxNFpoR080YUxIU01iaW80MnRtL3EwN3Jpd1ViMDJPK2NtM2tPZThjaFJ5VW5DUndKM0VEVkJDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc4NTc2MDUwNzoyOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUeVhURDc3dzAyUVZHWis5VThjVTgvQ2hMTEtCN0IxMXRTTTQybzQ4ZlFuIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk5MTUwNjgsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTStuIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254785760507",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/533oqh.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
