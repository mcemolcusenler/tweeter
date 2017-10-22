//this file handles the routing

"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });

  tweetsRoutes.post("/:id", function(req, res) {
    const tweetId = req.params.id;
    const likesObj = req.body.likesObj;
    console.log(tweetId, likesObj, likesObj.likes);
    if (likesObj.likes == 1) {  //if the likes attribute is 1, we call the saveLikes method w/ the appropriate argument
      DataHelpers.saveLikes(tweetId, 1, likesObj, (err) => {
        if (err) {
          res.status(500).json({ error: err.message});
        } else {
          res.status(200);
        }
      });
    } else if (likesObj.likes == 0) { //if the likes attribute is 0, we call the saveLikes method w/ the appropriate argument
      DataHelpers.saveLikes(tweetId, -1, likesObj, (err) => {
        if (err) {
          res.status(500).json({ error: err.message});
        } else {
          res.status(200);
        }
      });
    }
  });

  return tweetsRoutes;

}
