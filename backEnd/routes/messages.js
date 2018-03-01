
// ############## Messages ROUTE ############### // 
var express = require('express');
var router = express.Router();


// MongoDB - - import modules
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var url = "mongodb://localhost:27017/SiaShop";  // data base address

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
      

// ###################  store forms [ from Contact.html] to the data base    #######################  //

router.post('/', urlencodedParser, function (req, res, next) {         

    //console.log(1);
    console.log(req.body.name);
    console.log(req.body.email);

            MongoClient.connect(url, function(err, client) {
                var db = client.db('SiaShop');             
                if (err) throw err;
                db.collection("messages").insert({ name: req.body.name, phone: req.body.phone, email : req.body.email, subject: req.body.subject, text: req.body.text }, function (err, result) {    
                if (err) throw err;
                client.close();
                });
            });
        });
// ------ END of POST request --------//


module.exports = router;