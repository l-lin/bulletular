/**
 * User: louislin
 * Date: 23/11/13
 * Time: 17:46
 */

(function() {
    'use strict';

    var express = require('express');
    var app = express();
    app.configure(function() {
        app.use(express.bodyParser());
        app.use(express.methodOverride());
    });

    // Start mocking
    module.exports = app;
})();
