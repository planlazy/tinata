/**
 * TINATAPI
 */

var express = require('express');
var partials = require('express-partials');
var ejs = require('ejs');
var mongoJs = require('mongojs');
var Q = require('q');       // For promises
var util = require('util'); // For debugging

GLOBAL.db = mongoJs.connect("127.0.0.1/tinatapi", ["countries"]);

// Initialise and configure Express and Express Partials
var app = express();
app.use(express.static(__dirname + '/public'))
app.use(partials());
app.set('title', 'Tinatapi');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);
partials.register('.ejs', ejs);

app.get('/', function(req, res, next) {
    res.render('index');
});

// Legacy
app.get('/all/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.countries.find({}, function(err, countries) {
        res.send( JSON.stringify(countries) );
    });
});

/** 
 * List all countries
 */
app.get('/country/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.countries.find({}, function(err, countries) {
        res.send( JSON.stringify(countries) );
    });
});

/** 
 * List countries who names match the query
 */
app.get('/country/:iso', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.countries.find({ "iso": req.params.iso }, function(err, countries) {
        res.send( JSON.stringify(countries) );
    });
});

/**
 * Handle all other requests as 404 / Page Not Found errors
 */
app.use(function(req, res, next) {
    res.status(404).render('page-not-found', {
        title: "Page not found"
    });
});

app.listen(3001);