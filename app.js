var express = require('express');
var app = express();
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.get('/', function (req, res){
    res.render('index');
});

app.listen(3251);
console.log('Listening on port 3251');