const http = require('http');
const fs = require('fs');

let app = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    console.log(req.url);
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.end("Error");
        } else{
            res.write(data);
            res.end();
        }
    });
});

app.listen(3000, 'localhost');
