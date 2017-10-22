"use strict";
// Defines helper functions for saving and getting tweets, using the database
module.exports = function makeDataHelpers(db) {
  const { ObjectID } = require('mongodb');
  return {

    // Saves a tweet to mongodb
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in mongodb
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    // Get the likes in a tweet and save it to the DB
    saveLikes: function(id, like, object, callback) {
      db.collection("tweets").update(
        {"_id" : ObjectID(`${id}`)},
        {$inc: {'likes': like}},
        {
          upsert: false,
          multi: false
        }
    )}
  };
}