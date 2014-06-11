var express     = require('express');
var app         = express();
var path        = require('path');
var ECT         = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });
var config      = require('config');
var util        = require('util');
var parser      = require('xml2json');
var querystring = require("querystring");

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  var params = {
    title : "Express3 + ECT + Backbone.js で YAHOO API でニュース検索"
  }
  res.render('index', params);
})

app.get('/getNews', function(req, res){
  var keyWord = req.query.keyWord;
  var request = require('request');
  var url = 'http://news.yahooapis.jp/NewsWebService/V2/topics?';
  url    += util.format('appid=%s&query=%s&category=domestic', config.app_id, querystring.escape(keyWord));
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data   = parser.toJson(body, {object:true});
      res.contentType('json');
      res.send(data.ResultSet.Result || []);
      console.log(data.ResultSet.Result);
    } else {
      res.send(response.statusCode);
    }
  })
})

app.listen(3251);
console.log('Listening on port 3251');

process.on('uncaughtException', function(err) { 
  console.log(err);  
  setTimeout(function(){ process.exit(1); }, 1000);
});
