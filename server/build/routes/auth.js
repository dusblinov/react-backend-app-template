'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _methods = require('./auth-routes/_methods');

exports.default = function () {
	var routes = (0, _express.Router)();

	routes.post('/role', _methods.getRoleUser).post('/login', _methods.userLogin);

	return routes;
};