'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;
var file = chai.file;

describe('Acceptance: ember generate and destroy resource', function() {
  setupTestHooks(this);

  it('foo', function() {
    var args = ['resource', 'foo'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, (_file) => {
        expect(_file('app/routes/foo.js'))
          .to.contain("import Ember from 'ember';")
          .to.contain("export default Route.extend({\n});");

        expect(_file('app/templates/foo.hbs'))
          .to.contain('{{outlet}}');

        expect(_file('tests/unit/routes/foo-test.js'))
          .to.contain("import { moduleFor, test } from 'ember-qunit';")
          .to.contain("moduleFor('route:foo'");

        expect(_file('app/models/foo.js'))
          .to.contain('import Model from \'ember-data/model\';')
          .to.contain('export default Model.extend(')
          .to.not.contain('import attr from \'ember-data/attr\';')
          .to.not.contain('import { belongsTo } from \'ember-data/relationships\';')
          .to.not.contain('import { hasMany } from \'ember-data/relationships\';')
          .to.not.contain('import { belongsTo, hasMany } from \'ember-data/relationships\';');

        expect(_file('tests/unit/models/foo-test.js'))
          .to.contain('moduleForModel(\'foo\'');

        expect(file('app/router.js'))
          .to.contain('this.route(\'foo\')');
      }))
      .then(() => expect(file('app/router.js'))
        .to.not.contain('this.route(\'foo\')'));
  });
});
