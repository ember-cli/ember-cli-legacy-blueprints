'use strict';

var lint = require('mocha-eslint');

var paths = [
  'blueprints',
  'node-tests',
  'index.js',
];

lint(paths, {
  timeout: 10000,
  slow: 2000,
});
