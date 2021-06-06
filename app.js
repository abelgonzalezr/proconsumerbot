const express = require('express');
const app = express();
const scrapeServices = require("./services/scrapeServices");
const readPdfServices = require("./services/readPdfServices");
var cron = require('node-cron');
require('dotenv').config();
 
app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
  //cron.schedule(process.env.cronRules, () => {
    readPdfServices.deletePdfs();
    console.log('Init scraping process');
    scrapeServices.downloadPdfs();
    setTimeout(()=>{
      readPdfServices.insertPdfs();
    },50000)
    
  //});
})



