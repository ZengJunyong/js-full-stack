var debug = require('debug')('learn-mongoose');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose');
mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    debug("we're connected!");
});

// Defining your schema
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

// Creating a model
var Blog = mongoose.model('Blog', blogSchema);
