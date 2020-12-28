const scrapeServices = require("./services/scrapeServices");
var cron = require('node-cron');
require('dotenv').config();
 

console.log("start app");
cron.schedule(process.env.cronRules, () => {
  console.log('Init scraping process');
  scrapeServices.downloadPdfs();
});

