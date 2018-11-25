
'use strict';

module.exports = function (Mymodel) {

    var app = require('../../server/server');
    var loopback = require('loopback');

    Mymodel.beforeRemote("*", function (context, unused, next) {
        // Comprobamos la seguridad
        next();
        /*    seguridad.prueba2(context).then(function (response) {
               console.log("Success!", response);
           }).catch(function (error) {
               console.log("Failed!", error);
               context.res.statusCode = error.respuesta.statusCode;
               next(error.respuesta.error);
           });
    */
    });


    /* Mymodel.afterRemote("status", function (ctx, next) {
        console.log("PASAMOS AFTER");
        console.log(next);
    }); */


    // Ejemplo de usar repostjs 

    Mymodel.generatePdf = function (cb) {

        console.log("asdasdsad");

        const jsreport = require('jsreport');

        jsreport.render({
            template: {
                content: `<!doctype html><html><head> <meta charset="utf-8"> <title>A simple, clean, and responsive HTML invoice template</title> <style>.invoice-box{max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); font-size: 16px; line-height: 24px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #555;}.invoice-box table{width: 100%; line-height: inherit; text-align: left;}.invoice-box table td{padding: 5px; vertical-align: top;}.invoice-box table tr td:nth-child(2){text-align: right;}.invoice-box table tr.top table td{padding-bottom: 20px;}.invoice-box table tr.top table td.title{font-size: 45px; line-height: 45px; color: #333;}.invoice-box table tr.information table td{padding-bottom: 40px;}.invoice-box table tr.heading td{background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;}.invoice-box table tr.details td{padding-bottom: 20px;}.invoice-box table tr.item td{border-bottom: 1px solid #eee;}.invoice-box table tr.item.last td{border-bottom: none;}.invoice-box table tr.total td:nth-child(2){border-top: 2px solid #eee; font-weight: bold;}@media only screen and (max-width: 600px){.invoice-box table tr.top table td{width: 100%; display: block; text-align: center;}.invoice-box table tr.information table td{width: 100%; display: block; text-align: center;}}/** RTL **/ .rtl{direction: rtl; font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;}.rtl table{text-align: right;}.rtl table tr td:nth-child(2){text-align: left;}</style></head><body> <div class="invoice-box"> <table cellpadding="0" cellspacing="0"> <tr class="top"> <td colspan="2"> <table> <tr> <td class="title"> <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;"> </td><td> Invoice #: 123<br>Created: January 1, 2015<br>Due: February 1, 2015 </td></tr></table> </td></tr><tr class="information"> <td colspan="2"> <table> <tr> <td> Sparksuite, Inc.<br>12345 Sunny Road<br>Sunnyville, CA 12345 </td><td> Acme Corp.<br>John Doe<br>john@example.com </td></tr></table> </td></tr><tr class="heading"> <td> Payment Method </td><td> Check # </td></tr><tr class="details"> <td> Check </td><td> 1000 </td></tr><tr class="heading"> <td> Item </td><td> Price </td></tr><tr class="item"> <td> Website design </td><td> $300.00 </td></tr><tr class="item"> <td> Hosting (3 months) </td><td> $75.00 </td></tr><tr class="item last"> <td> Domain name (1 year) </td><td> $10.00 </td></tr><tr class="total"> <td></td><td> Total: $385.00 </td></tr></table> </div></body></html>`,
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                foo: "world"
            }
        }).then((resp) => {
            //cb(null, resp.content, 'application/pdf', 'attachment; filename=report.pdf');
            cb(null, resp.content, 'application/pdf');
        }).catch((error) => {
            cb(null, error);
        });

        //cb(null, "DAVID");

    };

    // New methods
    Mymodel.remoteMethod(
        'generatePdf', {
            http: {
                path: '/generatePdf',
                verb: 'get'
            },
            returns: [
                { arg: 'body', type: 'file', root: true },
                { arg: 'Content-Type', type: 'string', http: { target: 'header' } }
                //{ arg: 'Content-Disposition', type: 'string', http: { target: 'header' } }

            ]
        }
    );

};


