/**
 * Created by lty on 15/9/27.
 */
var application_root = __dirname,
    express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    mongoose = require("mongoose");

var app = express();

app.use(express.static(path.join(application_root, "site")));
app.use(bodyParser());
var port = 4711;
app.listen(port, function() {
   console.log("express");
});
app.get("/api", function(req, res) {
    res.send("Library api is on");
});
app.get("/api/books", function(req, res) {
   return BookModel.find(function(err, books) {
       if(err) {
           return console.log(err);
       }else {
           return res.send(books);
       }
   })
});
app.post("/api/books", function(req, res) {
   var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
   });
    console.log(book);
    return book.save(function(err) {
        if(err) {
            console.log(err);
        }else {
            console.log("created");
            return res.send(book);
        }
    });
});
app.get("/api/books/:id", function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {
        if(err) {
            console.log(err);
        }else {
            console.log("find book");
            return res.send(book);
        }
    });
});
app.put("/api/books/:id", function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;
        book.keywords = req.body.keywords;

        return book.save(function(err) {
           if(err) {
               console.log(err);
           }else {
               console.log("book updated");
               res.send(book);
           }
        });
    });
});
app.delete("/api/books/:id", function(req, res) {
   return BookModel.findById(req.params.id, function(err, book) {
      return book.remove(function(err) {
           if(err) {
               console.log(err);
           }else {
               console.log("delete success");
               return res.send("");
           }
       });
   });
});

mongoose.connect("mongodb://localhost/library_database");
var Keywords = new mongoose.Schema({
    keyword: String
});
var Book = new mongoose.Schema({
   title: String,
    author: String,
    releaseDate: Date,
    keywords: [ Keywords ]
});
var BookModel = mongoose.model( 'Book', Book );
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});