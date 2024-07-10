const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBJWWxCei9MeEtFL0oySTZ4YWM0bTQxbndjYUd3NHpaTjA0dXZES2ZIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUElpT0hHVDdTQjFpbEF6cDNnaXZIblZkY21iQVVNZThpVUlvVWtvWVptST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUGNwWWo4Zm1HVTNNUFJTZnlWa2ZxN0h4cUhoeHJNaHdCbWIwZU9ZQ0UwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxZlEweTF2TEpDeWUxdG8xL0o4eXJDSmcwdXBEcmtWNWxnWFNZZGRVK0NnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhFMFhqZzUyeTcrbEErVVVLbXpIdkFGY2dMV1l2c29Mb3k1azNvOE9BMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ2YVE2ZGE2SnBGd1NQQUxNWDhsQW1EMWNETVFnSDR4RjlCMjRIZzBOM009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0o3bkVJSnluTXJ0a3dxU3hyZUxZTnArY0RROWhyWm9tL2pBSk5lS3pGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGo0eGlzbWdaWUVsMi9iWDczNW95Yjh4eEllUTFzM2pJUXhVRytFcFdHTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ind6S2R0QzZlMkx0MTdBWVM0dEFiZHBWakl2YUdsYmlCVlMvSE9TMEVPZHVxbmZQQkhZcVg0RFJvdEVzVVBGcHFaYk44M1BONTNCYWhrS3VGTUF4Z2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJNTHI5Q3hReUVBb1l1MUFEcXlxRnNOeDZFL0tKdUQwQXF5Ty9tSlNtNHhVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzExMjY1NzcwNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0M0NEQUQ2RkMyMEJCRUQzRkI1NDc4MjkzRTY2NkNFRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwNTI4NjU2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMxMTI2NTc3MDVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTFGOTIzQ0UzMDk5NzA1MkFGMkI4MTQwRUJBRTAzREUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMDUyODY1Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiR0VsNmpzU3pUMG1pTVVpaDdJRmFsZyIsInBob25lSWQiOiI4Njc0NDRkMy00ZjdjLTQ4NDgtOWU3ZS05OWE3MWU4NTBmZWYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTytuVk91VUxIOEE3RnFIczArd2dvNVFsVzFVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNDNS9KUFBPRzNkaEVWdFcyK3BSVXNWaVFtND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSOTlISEI5RiIsIm1lIjp7ImlkIjoiOTIzMTEyNjU3NzA1OjI3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkdYUyBCQU5LSU5HIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNSHZsc3dERUlEZXRMUUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWSVFIN0JLWE9zMmJ5dEdjaTFENmNyMnJSN0lwNnoxOXlzL1NnbEUyYXhrPSIsImFjY291bnRTaWduYXR1cmUiOiJ5S2xsZ3Q5VGtua1ZKZlBrL1dFL3VwNDZnZmEycDdjV21MUlpKTFBUSFZoNExrTzdhbGlxVFFjQWdhV2REb1JLb29ROEJRaVBHODV6TlNPeGprYitEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiY29GS0QxZVhCYzZJeGZRZEVRVDlkbEJReTBSVHdtb0t4R1lyZ01qZzQzQlVUbVdlMkJlaXFud3dad0xPSXlZalVJZmt1aEViSlMvc2ViTmdPL3Nvamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMxMTI2NTc3MDU6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVlNFQit3U2x6ck5tOHJSbkl0UStuSzlxMGV5S2VzOWZjclAwb0pSTm1zWiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDUyODY1MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQSGYifQ==',
    PREFIXE: process.env.PREFIX || ".,+",
    OWNER_NAME: process.env.OWNER_NAME || "Faisal udas",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923037484167",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'Faisal-udas',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/56a42641b6a12a05390de.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '.,',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
