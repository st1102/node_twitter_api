var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var keys = require('../../twi_config.js');
var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

router.get('/', function(req, res, next) {
  var param = {"result" : "ok!"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

router.get('/search', function(req, res, next) {
  var params = {q : req.query.q,
                lang : 'ja',
                result_type : 'recent',
                count : '100',
                include_entities : 'true'};
  client.get('search/tweets.json', params, function (error, tweets, response) {
     if (!error) {
       res.header('Content-Type', 'application/json; charset=utf-8')
       res.send(tweets);
     } else {
       console.log(error);
     }
   })
});

module.exports = router;
