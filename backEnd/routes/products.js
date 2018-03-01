
// ############## PRODUCTS ROUTE ############### // 
var express = require('express');
var router = express.Router();


// MongoDB - - import modules
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var url = "mongodb://localhost:27017/SiaShop";  // data base address

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
      
// ###################  Products.html multi options - using SWITCH   #######################  //

router.post('/', function (req, res,next) {

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





















































// // ---------------- function: connect to Database and import all items ---------------// 
// function getproduct(callback){
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;

//         db.collection("products").find().toArray(function (err, result) {
//             if (err) throw err;
//             db.close();
//             callback(result);
//         });
//     });
// }
// // ---------------- the calling to the function  ---------------// 
// router.get('/', function(req, res, next) {

//     getproduct(function (result) {
          
//            res.render('products/list-products', { pb: result });  // the jade file in VIEWS //

//     });  
// });

// // ###################  GET add request to add user #######################  //



// // router.get('/add', function (req, res) {
// //     res.render('phonebook/form-add-contact');
// // });

// // router.get('/edit/:id', function (req, res) {
// //     MongoClient.connect(url, function (err, db) {
// //         if (err) throw err;

// //         db.collection("contacts").findOne({ _id: ObjectID(req.params.id) }, function (err, result) {
// //             if (err) throw err;
// //             db.close();
// //             res.render('phonebook/form-edit-contact', result);
// //         });
// //     });
// // });

// // router.get('/:id', function (req, res) {
// //     MongoClient.connect(url, function (err, db) {
// //         if (err) throw err;

// //         db.collection("contacts").findOne({ _id: ObjectID(req.params.id) }, function (err, result) {
// //             if (err) throw err;
// //             db.close();
// //             0res.json(result);
// //         });
// //     });
// // });

// // router.post('/add', urlencodedParser, function (req, res) {
// //     MongoClient.connect(url, function (err, db) {
// //         if (err) throw err;

// //         db.collection("contacts").insert({ name: req.body.name, phone: req.body.phone }, function (err, result) {
// //             if (err) throw err;
// //             db.close();
// //         });
// //     });

// //     res.redirect('/phonebook');
// // });

// // router.post('/edit', urlencodedParser, function (req, res) {
// //     MongoClient.connect(url, function (err, db) {
// //         if (err) throw err;
// //         db.collection("contacts").update(
// //             {_id: ObjectID(req.body._id)},
// //             {
// //                 $set: {
// //                     name: req.body.name,
// //                     phone: req.body.phone
// //                 }
// //             },
// //             function (err, result) {
// //             if (err) throw err;
// //             db.close();
// //             res.redirect('/phonebook');
// //         });
// //     });
// // });

// // router.get('/del/:id', function (req, res) {
// //     MongoClient.connect(url, function (err, db) {
// //         if (err) throw err;
// //         db.collection("contacts").remove(
// //             { _id: ObjectID(req.params.id)},
// //             function (err, result) {
// //                 if (err) throw err;
// //                 console.log(req.body._id);
// //                 console.log(req.params.id);
// //                 db.close();
// //                 res.redirect('/phonebook');
// //         });
// //     });
// // });

// res.json(result);

module.exports = router;