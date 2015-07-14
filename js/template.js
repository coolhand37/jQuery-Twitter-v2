'use strict';

var Handlebars = require('hbsfy/runtime')
var tweet = require('../templates/tweet.handlebars')
var compose = require('../templates/compose.handlebars')
var thread = require('../templates/thread.handlebars')
var test = require('../templates/test.handlebars')


module.exports = {
  Handlebars: Handlebars,
  tweet: tweet,
  compose: compose,
  thread: thread,
  test: test

};
