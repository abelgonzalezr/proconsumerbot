const fs = require('fs');
var pdf2table = require('pdf2table');
var db = require('../helpers/db');
var medicines = require('../models/medicineModel');



function getDrugstores(drugstores){
    //Delete Others headers
    drugstores= drugstores.filter( e=> e !== 'Desviación ' 
    && e!== 'Resumen' 
    && e!=='Orden' 
    && e!==' Genérico/Principio Activo'
    && e!== 'Concentración'
    && e!== ' Fabricante'
    && e!=='Presentación ');
    return drugstores;
}




function pdfToJson() {


    let pdfFilePath = "./pdf/medicamentos.pdf";
    let dataBuffer = fs.readFileSync(pdfFilePath);
    pdf2table.parse(dataBuffer, function (err, rows, rowsdebug) {
        if (err) return console.log(err);
        let drugsstores = getDrugstores(rows[0]);

        for (i=2; i<= rows.length ; i++){

            for (drugsstoreIteration=0; drugsstoreIteration<= drugsstores.length ; drugsstoreIteration++){
                var medicine = new medicines({
                    drugsstoreName: drugsstores[drugsstoreIteration],
                    numeroFarmacia: rows[1][drugsstoreIteration],
                    medicineName: rows[i][1],
                    concentration: rows[i][2],
                    maker: rows[i][3],
                    availablePresentation: rows[i][4],
                    price: rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])]
                });
               if(rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== '' && rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== null && 
                    rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== undefined && rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== '#N/D' && rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== '#¡DIV/0!' ){
                   
                 medicine.save(()=>{})
               }
            }

           
        }
    });

}


module.exports.pdfToJson = pdfToJson;

