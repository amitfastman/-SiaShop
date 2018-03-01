var express = require('express');
var router = express.Router();
var path = require('path');
var password = "admin";
var username= "admin";
var answer = { error: "wrong"};



// ---------------  MongoDB - import modules   -----------------------//
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var url = "mongodb://localhost:27017/SiaShop";  // data base address

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// ###################  ADMIN login validation    #######################  //

router.post('/', function (req, res, next) {         

    console.log(req.body.username);
    console.log(req.body.password);


     if ((req.body.username == username) && (req.body.password == password)) {
        res.render('admin/index');  // redirect to administartor website
    // else  
    //   res.json(answer.error);  // in case of wrong details
      }
 });

// ------ END of POST request --------//


// ###################  ADMIN - add NEW product TO data base    #######################  //

router.post('/new', urlencodedParser, function (req, res) {
       
    MongoClient.connect(url, function(err, client) {
        var db = client.db('SiaShop');             
        if (err) throw err;
        db.collection("products").insert(
                           {     
                            id: (req.body[0].id)*1,  
                            name: req.body[0].name,
                            price: (req.body[0].price)*1,
                            stock: (req.body[0].stock)*1,
                            description: req.body[0].description,
                            catagory1: req.body[0].catagory1,
                            catagory2: req.body[0].catagory2,
                            catagory3: req.body[0].catagory3,
                            image: req.body[0].image
                           },     
        function (err, result) {    
        if (err) throw err;
        client.close();
       //res.send("its ok");
        res.json({result});  // the ejs file in VIEWS //
        });
    });     
});
    
// ------ END of POST request --------//

// ###################  ADMIN - EDIT exist product in data base    #######################  //

router.post('/edit', urlencodedParser, function (req, res, next) {
       
    MongoClient.connect(url, function(err, client) {
        var db = client.db('SiaShop');             
        if (err) throw err;
        db.collection("products").update({_id: ObjectID(req.body[0]['_id'])},
                     {
                         $set: {
                            id: (req.body[0].id)*1,  
                            name: req.body[0].name,
                            price: (req.body[0].price)*1,
                            stock: (req.body[0].stock)*1,
                            description: req.body[0].description,
                            catagory1: req.body[0].catagory1,
                            catagory2: req.body[0].catagory2,
                            catagory3: req.body[0].catagory3,
                            image: req.body[0].image
                         }
                     }
        
        , function (err, result) {    
        if (err) throw err;
        client.close();  
        res.json({result});  // RESPONSE //
        });
    });
});
// ------ END of POST request --------//


// ###################  ADMIN - Delete exist product from data base    #######################  //

router.post('/delete', urlencodedParser, function (req, res) {
       

    MongoClient.connect(url, function(err, client) {
        var db = client.db('SiaShop');             
        if (err) throw err;
        db.collection("products").remove({ _id: ObjectID(req.body[0]['_id'])}, function (err, result) {    
        if (err) throw err;
        client.close();
        res.json({result});  // RESPONSE //
        });
    });
});



//############################################################################################################

// ###################  ADMIN - Products.html multi options - using SWITCH   #######################  //

router.post('/products', function (req, res,next) {

            var category = req.body[0];  // recive the first value from POST request
            var buttNum = req.body[1]*1; // recive the second value from POST request
   // ---  IMPORTENT : POST BODY data is STRING type (json)!! to get number we must change to value by *1 !  ---// 
            console.log(category);
            console.log(buttNum);    
        
            switch(buttNum) {
                    case 1:
                        var query = { price : {$lte:50} };    
                        break;
                    case 2:
                        var query= { price : {$gte: 51, $lte:249 } };   
                        break;
                    case 3:
                        var query= { price : {$gte: 250} };   
                        break;
                    case 4:
                        var query = { $or:[ {catagory1: 'Necklaces'}, {catagory2: 'Necklaces'} ,{ catagory3: 'Necklaces'} ]  };
                        break;
                    case 5:
                        var query = { $or:[ {catagory1: 'Watches'}, {catagory2: 'Watches'} ,{ catagory3: 'Watches'} ]  };
                        break;
                    case 6:
                        var query = { $or:[ {catagory1: 'Bracelets'}, {catagory2: 'Bracelets'} ,{ catagory3: 'Bracelets'} ]  };
                        break;
                    case 7:
                        var query = { $or:[ {catagory1: 'Rings'}, {catagory2: 'Rings'} ,{ catagory3: 'Rings'} ]  };
                        break;
                    case 8:
                        var query = { $or:[ {catagory1: 'Fashion Jewelry'}, {catagory2: 'Fashion Jewelry'} ,{ catagory3: 'Fashion Jewelry'} ]  };
                        break;
                    case 9:
                        var query = { $or:[ {catagory1: 'Engagement'}, {catagory2: 'Engagement'} ,{ catagory3: 'Engagement'} ]  };
                        break;
                    case 10:
                        var query = { $or:[ {catagory1: 'Men'}, {catagory2: 'Men'} ,{ catagory3: 'Men'} ]  };
                        break;
                    case 11:
                        var query = { $or:[ {catagory1: 'Vintage'}, {catagory2: 'Vintage'} ,{ catagory3: 'Vintage'} ]  };
                        break;
                    case 13:
                        var query = { };
                        break;
                    default:
                        var query = { };
                        break;
            }

            MongoClient.connect(url, function(err, client) {
                var db = client.db('SiaShop');             
                if (err) throw err;
                db.collection("products").find(query).sort({price : 1}).toArray( function (err, result) {    // query include find query from switch // 
                if (err) throw err;
                client.close();
                res.json(result);
                });
            });
        });
// ------ END of POST request --------//
//################################################################################//
router.post('/list', function(req, res, next) {             
      MongoClient.connect(url, function(err, client) {
        var db = client.db('SiaShop');             
        if (err) throw err;
        db.collection("products").find().toArray(function(err, result){ 
               if (err) throw err;
               client.close();
               res.json(result);               // return full DB json file to angular controller 
            });
        });
    });

//##############################################################################################################

module.exports = router;