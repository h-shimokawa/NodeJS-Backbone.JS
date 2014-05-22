var express = require('express');
var app = express();
var path     = require('path');
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
  var params = {
    title : "Express3 + ECT + Backbone.js"
  }
  res.render('index', params);
});

app.listen(3251);
console.log('Listening on port 3251');