'use strict';

var $ = require('jquery');

var baseUrl = 'http://localhost:3000';

var repliesCache = $.get(baseUrl + '/replies');

var allUsers = $.get(baseUrl + '/users');

$(function () { 

	var template = require('./template');
	var currentUser = {
	  handle: '@bradwestfall',
	  img: 'brad.png',
	  id: 1
	};

	
	
	function getUsers () {
		return $.get(baseUrl + '/users');
	}

	function getUserData (users) {
		users.forEach(function (user) {
			$.get(baseUrl + '/users/' + user.id + '/tweets')
				.done(function (usertweets) {
					usertweets.forEach(function (tweet) {
						$('#tweets').append(renderThread(user, tweet.message, tweet.id));
						console.log(tweet.id);
					});
				}).fail(function (xhr) {
				 	console.log('user ' + user.id + ' tweets request failed', xhr.status)
					});
		});
	}

	getUsers()
	 .done(getUserData)
	 .fail(function (xhr) {
			console.log('user data request error', xhr.status);
		});

	function getReplies() {
			$.get(baseUrl + '/replies')
				.done(function (replies) {
					repliesCache = replies;
				});
	}

getReplies();


	function renderTweet (user, message, tweetId) {

		var fields = {
			user: user,
			message: message,
			tweetId: tweetId
		};
 
		return template.tweet(fields);
	}

	
	 
	function renderCompose () {

		return template.compose();

	}

	function renderThread (user, message, tweetId) {
	
		var tweetHtml = renderTweet(user, message, tweetId);
		var fields = {
			user: user,
			tweet: tweetHtml,
			reply: renderCompose(),
			
		};

		return template.thread(fields);
	}


$('#main').on('click', 'textarea', function () {

		$(this).parents('form').toggleClass('expand');

	});

$('#main').on('click', 'button', function () {
		var message = $(this).parents('.compose').find('textarea').val();

		if ($(this).parents('.replies').length) {
			

			var tweet = $(this).parents('.replies').siblings('.tweet').attr('id');

			$.post(baseUrl + '/replies', {
				userId: currentUser.id,
				message: message,
				tweetId: tweet.substring(6)
			}).done(function (reply) {
				
				$('#' + tweet).siblings('.replies').append(renderTweet(currentUser, message, reply.id));
				repliesCache.push(reply);
			});

		
		} else {

			$.post(baseUrl + '/tweets', {
				userId: currentUser.id,
				message: message
			}).done(function (tweet) {
				
				$('#tweets').append(renderThread(currentUser, message, tweet.id));
					
				});
			
		}

		$(this).parents('.compose').removeClass('expand');

		$('textarea').val('');
		console.log(renderThread(currentUser, message));



		return false;


	});

$('#main').on('click', '.tweet', function () {
	
	$(this).parents('.thread').toggleClass('expand');
	
	var tweetId = $(this).attr('id').substring(6);

	var replies = repliesCache.filter(function(reply) {
		return reply.tweetId == tweetId;
	});

	var repliesContainer = $(this).siblings('.replies');
	repliesContainer.empty();
	repliesContainer.append(renderCompose());

	replies.forEach(function (reply) {
		
		var replyOwner;
		
		allUsers
			.done(function (users) {
				users.forEach(function (user) {
					if (user.id === reply.userId) {
						replyOwner = user;
					}

				});
			
			});
		
		repliesContainer.append(renderTweet(replyOwner, reply.message, reply.id));

	});

});

});





