const fs = require('fs');
var pdf2table = require('pdf2table');
var db = require('../helpers/db');
var medicines = require('../models/medicineModel');
var foods = require('../models/foodModel');
var ironmongerys = require('../models/ironmongeryModel');

function insertPdfs(pdfToRead) {
  console.log("init read pdf")
    insertFood("Food");
    
     insertFood("dairyProducts");
    
     insertMedicine();
    
     insertIronmongery();
    // switch (pdfToRead) {
    //     case "Food.pdf":
    //      insertFood("Food");
    //     case "dairyProducts.pdf":
    //      insertFood("dairyProducts");
    //     case "Medicines.pdf":
    //      insertMedicine();
    //     case "Ironmongery.pdf":
    //      insertIronmongery();
    // }

}

function getCommercesName(documentHeader, type) {
    //Delete Others headers
    if (type === "Medicine") {
        documentHeader = documentHeader.filter(e => e !== 'Desviación '
            && e !== 'Resumen'
            && e !== 'Orden'
            && e !== ' Genérico/Principio Activo'
            && e !== 'Concentración'
            && e !== ' Fabricante'
            && e !== 'Presentación ');
        return documentHeader;
    } else if (type === "Food") {
        documentHeader = documentHeader.filter(e => e !== 'NO.'
            && e !== 'Descripción de Productos'
            && e !== 'Unidad de Medida'
            && e !== 'Presentación y/o'
            && e !== 'Promedio Global'
            && e !== 'Media y/o'
            && e !== ' Precios '
            && e !== 'Mínimo'
            && e !== 'Resumen General'
            && e !== 'Máximo'
            && e !== 'Moda'
            && e !== 'Mediana'
            && e !== 'Desviación'
            && e !== 'Estándar'
        );
        return documentHeader;
    } else {
        documentHeader = documentHeader.filter(e => e !== 'Resumen');
        return documentHeader;
    }

}



function insertFood(filename) {
    let pdfFilePath = `./pdf/${filename}.pdf`;
    if (fs.existsSync(pdfFilePath)) {
        let dataBuffer = fs.readFileSync(pdfFilePath);
        pdf2table.parse(dataBuffer, function (err, rows, rowsdebug) {
            if (err) return console.log(err);
            let commercesName = getCommercesName(rows[0], "Food");

            for (i = 2; i <= rows.length; i++) {

                for (commercesNameIteration = 0; commercesNameIteration <= commercesName.length; commercesNameIteration++) {
                    var medicine = new foods({
                        superMarkerName: commercesName[commercesNameIteration],
                        producDescription: rows[i][1],
                        availablePresentation: rows[i][2],
                        price: rows[i][rows[0].indexOf(commercesName[commercesNameIteration])]
                    });
                    if (rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== '' && rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== null &&
                        rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== undefined && rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== '#N/D' && rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== '#¡DIV/0!') {

                        medicine.save(() => { })
                    }
                }


            }
        });
    }

}

function insertMedicine() {
    let pdfFilePath = "./pdf/Medicines.pdf";
    if (fs.existsSync(pdfFilePath)) {
        let dataBuffer = fs.readFileSync(pdfFilePath);
        pdf2table.parse(dataBuffer, function (err, rows, rowsdebug) {
            if (err) return console.log(err);
            let drugsstores = getCommercesName(rows[0], "Medicine");

            for (i = 2; i <= rows.length; i++) {

                for (drugsstoreIteration = 0; drugsstoreIteration <= drugsstores.length; drugsstoreIteration++) {
                    var medicine = new medicines({
                        drugsstoreName: drugsstores[drugsstoreIteration],
                        numeroFarmacia: rows[1][drugsstoreIteration],
                        medicineName: rows[i][1],
                        concentration: rows[i][2],
                        maker: rows[i][3],
                        availablePresentation: rows[i][4],
                        price: rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])]
                    });
                    if (rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== '' && rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== null &&
                        rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== undefined && rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== '#N/D' && rows[i][rows[0].indexOf(drugsstores[drugsstoreIteration])] !== '#¡DIV/0!') {

                        medicine.save(() => { })
                    }
                }


            }
        });
    }


}

function insertIronmongery() {
    let pdfFilePath = `./pdf/Ironmongery.pdf`;
    if (fs.existsSync(pdfFilePath)) {
        let dataBuffer = fs.readFileSync(pdfFilePath);
        pdf2table.parse(dataBuffer, function (err, rows, rowsdebug) {
            if (err) return console.log(err);
            let commercesName = getCommercesName(rows[0], "Ironmongery");

            for (i = 2; i <= rows.length; i++) {

                for (commercesNameIteration = 0; commercesNameIteration < commercesName.length; commercesNameIteration++) {

                    var ironmongery = new ironmongerys({
                        ironmongeryName: commercesName[commercesNameIteration],
                        producDescription: rows[i][1],
                        brand: rows[i][2],
                        unitMeasurement: rows[i][3],
                        price: rows[i][rows[0].indexOf(commercesName[commercesNameIteration])]
                    });
                    if (rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== '' && rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== null &&
                        rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== undefined && rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== '#N/D' && rows[i][rows[0].indexOf(commercesName[commercesNameIteration])] !== '#¡DIV/0!') {

                        ironmongery.save(() => { })
                    }
                }


            }
        });
    }
}

module.exports.insertPdfs = insertPdfs;