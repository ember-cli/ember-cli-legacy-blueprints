/*jshint node:true*/

var Blueprint  = require('ember-cli/lib/models/blueprint');
var Promise    = require('ember-cli/lib/ext/promise');
var merge      = require('lodash/object/merge');
var inflection = require('inflection');

module.exports = {
  description: 'Generates a model and route.',

  install: function(options) {
    return this._process('install', options);
  },

  uninstall: function(options) {
    return this._process('uninstall', options);
  },
  
  _processBlueprint: function(type, name, options) {
    var mainBlueprint = this.lookupBlueprint(name);
    return Promise.resolve()
      .then(function() {
        return mainBlueprint[type](options);
      })
      .then(function() {
        var testBlueprint = mainBlueprint.lookupBlueprint(name + '-test', {
          ui: this.ui,
          analytics: this.analytics,
          project: this.project,
          ignoreMissing: true
        });

        if (!testBlueprint) { return; }

        if (testBlueprint.locals === Blueprint.prototype.locals) {
          testBlueprint.locals = function(options) {
            return mainBlueprint.locals(options);
          };
        }

        return testBlueprint[type](options);
      });
  },

  _process: function(type, options) {
    this.ui = options.ui;
    this.project = options.project;
    var entityName = options.entity.name;
    
    var modelOptions = merge({}, options, {
      entity: {
        name: entityName ? inflection.singularize(entityName) : ''
      }
    });

    var routeOptions = merge({}, options);

    return this._processBlueprint(type, 'model', modelOptions)
              .then(function() {
                return this._processBlueprint(type, 'route', routeOptions);
              }.bind(this));
  }

};
