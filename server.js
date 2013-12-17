var connect = require('connect');
var http = require('http');
var fs = require('fs');
var app = connect();

app
  .use(connect.favicon())
  .use(connect.static('client'))
  .use(function (req, res) {
    switch (req.url) {
      case '/api/files' :
        res.writeHead(200, {'content-type':'application/json'});
        fs.createReadStream('files.json').pipe(res);
        break;

      default :
        break;
    }
  });

http.createServer(app).listen(8001);
console.log('Server running at http://localhost:8001');
