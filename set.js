const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR09ITnBYangweEdCUW1iV25GOWlndG9vVXd5M0dBRG5iRGs1dUdacEtrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1AzTCtJOC9ZOEVBaGpjZEdJZ2NmWTYrQTlpWDFIMzFMdk5OTklLdkhERT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVRjdka09aNVZERzhuT3hQMytoTlBwbWg1YUhKcHRoejRSeERLajRRUzFjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwL0hZWUhscjJxdUlvUDVNZjQ1cEpFM0EwZVJzdkFnK2cxS1NGYklPZXdrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhPN2R4ekpBN2hJdmdYcXphTGRnak8zVklzTzI1WGlYWXVBd0ZpSnlPVjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJ1TDFIWTVBRXNseU0reFl1dEJhRzRNcktYRlFJbTdCdHY2Y245elA3MlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09UZmpqeGZldERRSTFiR293ZTBXY2dWYVkrZklwQndMYXBGYUlacDBFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0tZYjg1STdQNzVhMkJrNnJzZTFhMG85K3l1REtNWnZpYUQ3ZXRkSkdFTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklwTE01SC9LOHZDeXM3T21QTjlYaS9pM1RCbkVXZ3loWGl4cE96RDBEY0x6bUtyZThEOHRkME1NWXdxM0tqYURJUnlLSkpOeVpweUZHbXlBS1I1L2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMsImFkdlNlY3JldEtleSI6ImlnT1UzT0dITW5iWDBpakRrUkllK1ZpcGV0eC9Kd3RTSG52dkNMTmVXckk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkxneG5TaXJ4U0tlVTZkbkdzeHYwMnciLCJwaG9uZUlkIjoiYzhmYmUwZDgtOTI1OS00MjU3LWI5MWQtNGMxZmRlYzQ5NTMzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllzeW9XME5NaFhuYVAvTFJDeTNjcTZtdFFKRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRFFNaStQQm9qK1M5RmxTanNsaGovYzJ4a1U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNjlXU01aQjUiLCJtZSI6eyJpZCI6IjIzNDcwMTMxNTkyNDQ6NTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4ZWZ4oGgKOKBoMKg4oGgwqDigaDigKLigaDCoOKBoOKAv+KBoMKg4oGg4oCi4oGgwqDigaDCoOKBoCnigaDhlZcifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pPUjFkWUVFTG5xbXJRR0dEWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImcxWE1RRFlmUHJwdzdRVHQ1Zmg5VGJVaWExWDlTK0ZhczR6SVRvQXdzVFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IldiNVlrRW56TDhZZ3NuVk1kLzMyaVltQXpMQmxzZHJORzExRUpzOUlzVy9PWmZUSDY5ZXFCRmxVdjQreUVUYzJRRDRKbkVoV0oxQVZpYzdPNHNSa0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXY21vU0djL0VWMEVWWXdYQmVwOVBBMC9GbURFWGdYMHVDdFhFVllCOVEySFBacUM3Mkc5bXFqaHFFamhSa0t1djRvR0tia2k2MCtWV2E3VmhIejRnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMTMxNTkyNDQ6NTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWU5WekVBMkh6NjZjTzBFN2VYNGZVMjFJbXRWL1V2aFdyT015RTZBTUxFMCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDEwNDI2Mn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347013159244",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
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
