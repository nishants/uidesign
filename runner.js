(function () {
  "use strict"
  var http = require('http'),
      fs = require('fs'),
      defaultDelay = 1000,

      encoding = "utf8",

      fileFor = function (url) {
        return url.replace("/", "");
      },

      responseHead = {
        'Cache-Control': 'no-cache'
      };

  http.createServer(function (req, res) {
    fs.readFile(fileFor(req.url), encoding, function (err, contents) {
      if (err) {
        res.writeHead(404, responseHead);
      } else {
        res.writeHead(200, responseHead);
        setTimeout(function(){
          res.end(contents);
        }, defaultDelay);
        ;
      }
    });

  }).listen(8080, '127.0.0.1');
}).call(this);