'use strict';

var $ = require('jquery')

$(function () { 

	var template = require('./template')
	// var api = require('./api')

	var currentUser = {
	  handle: '@bradwestfall',
	  img: 'brad.png',
	  id: 1
	};


	// $.get('http://localhost:3000/users')
	// 	.done(function(users) {
	// 		console.log('user data', users)
	// 	}).fail(function (xhr) {
	// 		console.log('users request failed', xhr.status)
	// 	})

	// $.get('http://localhost:3000/tweets')
	// 	.done(function(tweets) {
	// 		console.log('user tweets', tweets)
	// 	}).fail(function (xhr) {
	// 		console.log('users tweets request failed', xhr.status)
	// 	})

	// $.get('http://localhost:3000/replies')
	// 	.done(function(replies) {
	// 		console.log('user replies', replies)
	// 	}).fail(function (xhr) {
	// 		console.log('users replies request failed', xhr.status)
	// 	})

	// $.post('http://jsonplaceholder.typicode.com/users', currentUser)
	// 	.done(function (user) {
	// 		console.log(user)
	// 	}).fail(function (xhr, errMsg) { 
	// 		console.log(xhr.status)   
	// 	})
	var baseUrl = 'http://localhost:3000/';
	
	function getUsers () {
		return $.get(baseUrl + '/users')
	} 

	function getUsersPosts (users) {
	 users.forEach(function (user) {
	  console.log('user data', user)
	  $.get(baseUrl + '/users/' + user.id + '/posts')
	    .done(function (userposts) {
		 console.log('posts for user ' + user.id, userposts)
	    }).fail(function (xhr) {
	   	 console.log('user ' + user.id + ' posts request failed')
	   })
	 })
	}

	getUsers()
	 .done(getUsersPosts)
	 .fail(function(xhr) {
		console.log('user posts request error', xhr.status)
	});

	 


});
