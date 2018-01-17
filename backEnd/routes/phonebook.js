var express = require('express');
var router = express.Router();

// MongoDB
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var url = "mongodb://localhost:27017/Phonebooxdb";

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// ###################  GET users list #######################  //
// ---------------- the function in case of external file ---------------// 
function getContact(callback){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("contacts").find().toArray(function (err, result) {
            if (err) throw err;
            db.close();
            callback(result);
        });
    });
}
// ---------------- calling to the function  ---------------// 
router.get('/', function(req, res, next) {

    getContact(function (result) {
        res.render('phonebook/list-contact', { pb: result });
    });

    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     console.log(db);
    //     db.collection("contacts").find().toArray(function (err, result) {
    //         if (err) throw err;
    //         db.close();
    //         res.render('phonebook/list-contact', { pb: result });
    //     });
    // });
    
});

// ###################  GET add request to add user #######################  //



router.get('/add', function (req, res) {
    res.render('phonebook/form-add-contact');
});

router.get('/edit/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("contacts").findOne({ _id: ObjectID(req.params.id) }, function (err, result) {
            if (err) throw err;
            db.close();
            res.render('phonebook/form-edit-contact', result);
        });
    });
});

router.get('/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("contacts").findOne({ _id: ObjectID(req.params.id) }, function (err, result) {
            if (err) throw err;
            db.close();
            res.json(result);
        });
    });
});

router.post('/add', urlencodedParser, function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        db.collection("contacts").insert({ name: req.body.name, phone: req.body.phone }, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });

    res.redirect('/phonebook');
});

router.post('/edit', urlencodedParser, function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("contacts").update(
            {_id: ObjectID(req.body._id)},
            {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone
                }
            },
            function (err, result) {
            if (err) throw err;
            db.close();
            res.redirect('/phonebook');
        });
    });
});

router.get('/del/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("contacts").remove(
            { _id: ObjectID(req.params.id)},
            function (err, result) {
                if (err) throw err;
                console.log(req.body._id);
                console.log(req.params.id);
                db.close();
                res.redirect('/phonebook');
        });
    });
});

module.exports = router;