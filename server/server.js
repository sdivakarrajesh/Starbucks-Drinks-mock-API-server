const express = require('express')
const PORT = process.env.PORT || 5000
const http = require('http')
const path = require('path')
const fs = require('fs');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
//app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.get('/', function (req, res) {
    console.log(req.params);
    res.send('send an api request to the path /api/search with query parameters \'drink\' and \'limit\'');
});

app.get('/api', function (req, res) {
    res.redirect('/')
});


app.get('/api/search', function (req, res) {

    drink = req.query.drink
    if (drink == "" || drink == null || drink == {}) res.send("invalid drink type")
    limit = req.query.limit
    if (limit == null || limit == 0) limit = 10;


    jsonObj = [];

    fs.readdir(path.join(publicPath + "/" + drink), function (err, items) {
        
        limit = limit > items.length ? items.length : limit;
        for (var i = 0; i < limit; i++) {
            var filename = items[i].substr(0, items[i].lastIndexOf('.')) || items[i];
            var urlPath = path.join(publicPath + "/" + drink + "/" + items[i]);
            item = {}
            item["name"] = filename;
            item["url"] = urlPath;
            jsonObj.push(item);
            console.log("json obj",jsonObj);
            console.log("adding ", items[i])
        }

        console.log("sending away");
        console.log(jsonObj);
        res.send(jsonObj);
    });


})



