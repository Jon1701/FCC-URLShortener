var express = require('express');
var app = express();

// Library to check valid URLs.
var validUrl = require('valid-url');

// Library to generate random strings.
var randomstring = require('randomstring');

// Library to connect to a mongodb instance.
var MongoClient = require('mongodb').MongoClient;

// MongoDB options.
var MONGO = {
  host: 'localhost',
  port: 27017,
  database: 'ms-urlshortener',
  collection: 'urls',
  credentials: {
    username: 'app-ms-urlshortener',
    password: process.env['app-ms-urlshortener']
  }
};

// Add connection string to MongoDB options.
MONGO['connString'] = 'mongodb://'
                    + MONGO.credentials.username
                    + ':' + MONGO.credentials.password
                    + '@' + MONGO.host
                    + ':' + MONGO.port
                    + '/' + MONGO.database;

// Application options.
var OPTIONS = {
  shortcodeLength: 7
};

// Function to generate JSON to hold error message.
var generateError = function(str) {
  return {
    'error': {
      'msg': str
    }
  };
};

// Connects to a MongoDB instance, and generates a new short url.
var connectAndCreateShortUrl = function(req, res, originalUrl) {

  // Callback for inserting a document into a collection.
  var handleDocumentInsert = function(err, result) {

    // Error handling.
    if (err) {

      // Return an error stating a duplicate short url was found.
      return res.json(generateError('Unable to create short URL.'));

    } else {

      // When the document is inserted, a copy is returned.
      var document = result['ops'][0];

      // Delete _id field.
      delete document['_id'];

      // Return copy of the document.
      return res.json(document);

    };

  };

  // Callback to handle accessing a collection.
  var handleCollectionAccess = function(err, coll) {

    // Error checking.
    if (err) {

      // If unable to access the collection, return an error.
      return res.json(generateError('Unable to access collection.'));

    } else {

      // Generate a document containing the short url and the original url.
      var document = {
        'short_url': hostname + '/' + randomstring.generate(OPTIONS.shortcodeLength),
        'original_url': originalUrl
      };

      // Add this document to the collection.
      coll.insert(document, {w:1}, handleDocumentInsert);

    };

  };

  // Callback to handle connection to a MongoDB instance.
  var handleDatabaseConnect = function(err, db) {

    // Error checking.
    if (err) {

      // If an error occured, return an error message to the user.
      return res.json(generateError('Could not connect to database.'));

    } else {

      // If no error occurred, connect to a collection.
      db.collection(MONGO.collection, handleCollectionAccess);

    };

  };

  // Hostname of the request.
  var hostname = req.hostname;

  // Make a connection to the MongoDB instance.
  MongoClient.connect(MONGO.connString, handleDatabaseConnect);

};

// Serve static files from the ./dist folder.
app.use(express.static('dist'));

// Root folder. Serve index.html.
app.get('/', function(req, res) {
  res.render(__dirname + '/dist/index.html');
});

// Get hostname.
app.get('/hostname', function(req, res) {
  res.json(req.hostname);
});

// Route to create new short URLs.
app.post('/new/*', function (req, res) {

  // Get the parameter in the route.
  var url = req.params[0];

  // Check to see if the URL is a valid URL.
  if (validUrl.isUri(url)) {

    // Check for an existing short URL.
    connectAndCreateShortUrl(req, res, url);

  } else {

    // If the URL is not valid, return an error.
    res.json(generateError('Not a valid URL.'));// End error.

  }// End URL check.

});

// Handle short URL lookup and redirect.
app.get('/*', function(req, res) {

  // Callback to handle document search.
  var handleDocumentSearch = function(err, result) {

    // Error checking.
    if (err) {

      // Send error message.
      res.json(generateError('Unable to fetch document.'));

    } else {

      // Check to see if a document was returned.
      if (result) {

        // Document was returned.
        // Extract the original URL.
        var originalUrl = result['original_url'];

        // Redirect user to the original URL.
        res.redirect(originalUrl);

      } else {

        // No document was returned.
        // Send error message.
        return res.json(generateError('No short URL found.'));

      };

    };

  };

  // Callback to handle collection access.
  var handleCollectionAccess = function(err, coll) {

    // Error checking.
    if (err) {

      // Send error message.
      res.json(generateError('Unable to access collection.'));

    } else {

      // Build a query to search for the original URL.
      var q = {'short_url': hostname + '/' + path};

      // Suppress _id field.
      var options = {'_id': 0};

      // Search the collection.
      coll.findOne(q, options, handleDocumentSearch);

    };

  };

  // Callback to handle database connection.
  var handleDatabaseConnect = function(err, db) {

    // Error checking.
    if (err) {
      return res.json(generateError('Unabled to connect to the database.'));
    } else {

      // If no error occurred, connect to a collection.
      db.collection(MONGO.collection, handleCollectionAccess);

    }
  }

  // Get route path variable.
  var path = req.params[0];

  // Check to see if the path is 7 characters and alphanumeric.
  var pattern = /^\w{7}$/;

  // Check to see if the pattern is valid.
  if (pattern.test(path)) {

    // Hostname.
    var hostname = req.hostname;

    // Short URL is well-formed, search the database for the original URL.
    // Make a connection to the MongoDB instance.
    MongoClient.connect(MONGO.connString, handleDatabaseConnect);

  } else {

    if (path == 'hostname') {
      res.redirect('/hostname');
    } else {
      // Invalid short URL, return error message.
      res.json(generateError('Invalid Short URL.'));
    };

  };

});

// Let the port be set by Heroku.
var port = process.env.PORT || 8080
app.listen(port, function() {
  console.log('Listening for connections on PORT 8080');
});
