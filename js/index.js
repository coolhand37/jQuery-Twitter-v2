'use strict';

var currentUser = {
  handle: '@bradwestfall',
  img: 'brad.png',
  id: 1
};

var $ = require('jquery')
var template = require('./template.js')

$(function () {

	$('body').on('click', 'textarea', function() {
		$('.compose').toggleClass('expand')
	})


});
