# loopback-generate-html-to-pdf
## Generate pdf by html (jsreport) in loopback 3


## You need to put this code in server.js:

````javascript
const jsreport = require('jsreport');
jsreport().init();
````

The file server.js looks like:

````javascript
'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');


/* Logger */
var bunyan = require('bunyan');
var rootLogger = bunyan.createLogger({
  name: 'gestomb_log',
  streams: [{
    type: 'rotating-file',
    path: './var/log/gestomb.log.json',
    period: '1d',   // daily rotation
    count: 3        // keep 3 back copies
  }]
});
var logger = require('loopback-component-logger')(rootLogger);
/* Fin Logger */

/* jsreport pdf */
const jsreport = require('jsreport');
jsreport().init();
/* fin jsreport pdf */

var app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
````


## Then create a custom method in your model.
### see the note (// Can use this for donwload PDF and not open directly in browser) for donwload pdf and not open in browser
````javascript
'use strict';

module.exports = function (Personas) {
    
    // Example use of repostjs 
    Personas.status = function (cb) {

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
            //cb(null, resp.content, 'application/pdf', 'attachment; filename=report.pdf'); // Can use this for donwload PDF and not open directly in browser
            cb(null, resp.content, 'application/pdf');
        }).catch((error) => {
            cb(null, error);
        });
    };

    // New methods
    Personas.remoteMethod(
        'status', {
            http: {
                path: '/status',
                verb: 'get'
            },
            returns: [
                { arg: 'body', type: 'file', root: true },
                { arg: 'Content-Type', type: 'string', http: { target: 'header' } }
                //{ arg: 'Content-Disposition', type: 'string', http: { target: 'header' } } // Can use this for donwload PDF and not open directly in browser
            

            ]
        }
    );

};
````



