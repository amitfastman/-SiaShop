// --------------------- connect to mongo db from nodejs ------------------------

// var mongodb = require('mongodb');

// // console.log(mongodb);

// var mongoServer = new mongodb.Server( 'localhost', 27017 );

// var db = new mongodb.Db('HorseDB', mongoServer);

// console.log(db);

// db.open(function( err ){

//     if (err) throw err;

//     db.collection('unicorns', function( err, collection ){
//         if (err) throw err;

//         collection.find({weight: {$gt: 400, $lt: 700}},{name:1,weight:1, _id:0}, function( err, cursor ){

//             if (err) throw err;

//             cursor.toArray( function( err, data ){

//                 console.log(data);
//             }); 
//         }); 
//     });

//     db.close();
// });

// --------------------- connect to mongo db from nodejs - option 2 -----------------------


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/HorseDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  db.collection("unicorns").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
