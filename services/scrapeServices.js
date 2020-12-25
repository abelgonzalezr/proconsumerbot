const scrapeIt = require("scrape-it")
const download = require('download-pdf')
require('dotenv').config()

function downloadPdfs(){
    
    
    var productUrl;
    // obtener lista de productos
    scrapeIt(process.env.proconsumerURL, {
        title: "productos"
        , pages: {
            listItem: "li.menu-item-16 ul.sub-menu li.menu-item-object-custom"
            , name: "pages"
            , data: {
                title: "a"
                , url: {
                    selector: "a"
                    , attr: "href"
                }
                , submenu: {
                    listItem: "ul.sub-menu"
                    , name: "submenu"
                    , data: {
                        title: "a"
                        , url: {
                            selector: "a"
                            , attr: "href"
                        }
                    }
    
                }
            }
        }
    }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        for (let index = 0; index < data.pages.length; index++) {
    
            if(data.pages[index].submenu.length !=0) {
                productUrl = data.pages[index].submenu[0].url;
                console.log(productUrl);
            
                // obtener datos por producto en especifico
                scrapeIt(productUrl, {
                    pages: {
                        listItem: "div.wpfilebase-file-default"
                        , name: "pages"
                        , data: {
                            title: "a"
                            , url: {
                                selector: "a"
                                , attr: "href"
                            }
                        }
            
                    }
                }).then(({ data, response }) => {
                    console.log(`Status Code: ${response.statusCode}`)
                   
                    //dowload PDFS
                    var pdf = data.pages[0].url
                    let documentName="";

                    
                    if (data.pages[0].title.includes("Alimenticios")){
                        documentName="Alimenticios"
                    }else if (data.pages[0].title.includes("Lácteos")){
                        documentName="Lácteos"
                    }else if (data.pages[0].title.includes("Ferreteros")){
                        documentName="Ferreteros"
                    }else if (data.pages[0].title.includes("Medicamento")){
                        documentName="Medicamento"
                    }
                    console.log(data.pages[0].title);
                    var options = {
                        directory: "./pdf/",
                        filename:`${documentName}.pdf`
                    }
            
                    download(pdf, options, function (err) {
                        if (err) throw err
                        console.log("Descarga lista")
                    })
                })
            }
    
        }
    
    })
}

module.exports.downloadPdfs = downloadPdfs;
