'use strict';

var lint = require('mocha-eslint');

var paths = [
  'blueprints',
  'node-tests',
  'index.js',
];

lint(paths);
