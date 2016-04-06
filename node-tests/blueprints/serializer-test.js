'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
var modifyPackages = blueprintHelpers.modifyPackages;

var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;

describe('Acceptance: ember generate and destroy serializer', function() {
  setupTestHooks(this);

  it('serializer', function() {
    var args = ['serializer', 'foo'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('app/serializers/foo.js'))
          .to.contain('import JSONAPISerializer from \'ember-data/serializers/json-api\';')
          .to.contain('export default JSONAPISerializer.extend(');

        expect(_file('tests/unit/serializers/foo-test.js'))
          .to.contain('moduleForModel(\'foo\'');
      }));
  });

  it('serializer-test', function() {
    var args = ['serializer-test', 'foo'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/serializers/foo-test.js'))
          .to.contain('moduleForModel(\'foo\'');
      }));
  });

  it('serializer-test for mocha', function() {
    var args = ['serializer-test', 'foo'];

    return emberNew()
      .then(() => modifyPackages([
        {name: 'ember-cli-qunit', delete: true},
        {name: 'ember-cli-mocha', dev: true}
      ]))
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/serializers/foo-test.js'))
          .to.contain('import { describeModel, it } from \'ember-mocha\';')
          .to.contain('describeModel(\n  \'foo\',')
          .to.contain('Unit | Serializer | foo')
          .to.contain('needs: [\'serializer:foo\']')
          .to.contain('expect(serializedRecord).to.be.ok;');
      }));
  });
});
