const scrapeServices = require("./services/scrapeServices");
const readPdfServices = require("./services/readPdfServices");
var cron = require('node-cron');
require('dotenv').config();
 

console.log("start app");
cron.schedule(process.env.cronRules, () => {
  console.log('Init scraping process');
  scrapeServices.downloadPdfs();
  setTimeout(()=>{
    readPdfServices.insertPdfs();
  },30000)
  
});

