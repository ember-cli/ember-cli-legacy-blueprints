'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
var modifyPackages = blueprintHelpers.modifyPackages;

var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;

var SilentError = require('silent-error');

var generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');

describe('Acceptance: ember generate and destroy adapter', function() {
  setupTestHooks(this);

  it('adapter', function() {
    var args = ['adapter', 'foo'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('app/adapters/foo.js'))
          .to.contain('import ApplicationAdapter from \'./application\';')
          .to.contain('export default ApplicationAdapter.extend({');

        expect(_file('tests/unit/adapters/foo-test.js'))
          .to.contain('moduleFor(\'adapter:foo\'');
      }));
  });

  it('adapter with --base-class', function() {
    var args = ['adapter', 'foo', '--base-class=bar'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('app/adapters/foo.js'))
          .to.contain('import BarAdapter from \'./bar\';')
          .to.contain('export default BarAdapter.extend({');

        expect(_file('tests/unit/adapters/foo-test.js'))
          .to.contain('moduleFor(\'adapter:foo\'');
      }));
  });

  it('adapter throws when --base-class is same as name', function() {
    var args = ['adapter', 'foo', '--base-class=foo'];

    return emberNew()
      .then(() => expect(emberGenerate(args))
        .to.be.rejectedWith(SilentError, /Adapters cannot extend from themself/));
  });

  it('adapter when is named "application"', function() {
    var args = ['adapter', 'application'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('app/adapters/application.js'))
          .to.contain('import JSONAPIAdapter from \'ember-data/adapters/json-api\';')
          .to.contain('export default JSONAPIAdapter.extend({');

        expect(_file('tests/unit/adapters/application-test.js'))
          .to.contain('moduleFor(\'adapter:application\'');
      }));
  });

  it('adapter-test', function() {
    var args = ['adapter-test', 'foo'];

    return emberNew()
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/adapters/foo-test.js'))
          .to.contain('moduleFor(\'adapter:foo\'');
      }));
  });

  it('adapter-test for mocha', function() {
    var args = ['adapter-test', 'foo'];

    return emberNew()
      .then(() => modifyPackages([
        {name: 'ember-cli-qunit', delete: true},
        {name: 'ember-cli-mocha', dev: true}
      ]))
      .then(() => generateFakePackageManifest('ember-cli-mocha', '0.11.0'))
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/adapters/foo-test.js'))
          .to.contain('import { describeModule, it } from \'ember-mocha\';')
          .to.contain('describeModule(\n  \'adapter:foo\',')
          .to.contain('expect(adapter).to.be.ok;');
      }));
  });

  it('adapter-test for mocha v0.12+', function() {
    var args = ['adapter-test', 'foo'];

    return emberNew()
      .then(() => modifyPackages([
        {name: 'ember-cli-qunit', delete: true},
        {name: 'ember-cli-mocha', dev: true}
      ]))
      .then(() => generateFakePackageManifest('ember-cli-mocha', '0.12.0'))
      .then(() => emberGenerateDestroy(args, _file => {
        expect(_file('tests/unit/adapters/foo-test.js'))
          .to.contain('import { describe, it } from \'mocha\';')
          .to.contain('import { setupTest } from \'ember-mocha\';')
          .to.contain('describe(\'Unit | Adapter | foo\', function() {')
          .to.contain('setupTest(\'adapter:foo\',')
          .to.contain('expect(adapter).to.be.ok;');
      }));
  });
});
