var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy resource', function() {
  setupTestHooks(this);

  it('foo', function() {
    var files = [
      {
        file: 'app/router.js',
        contains: 'this.route(\'foo\')'
      },
      {
        file: 'app/routes/foo.js',
        contains: [
          "import Ember from 'ember';",
          "export default Ember.Route.extend({\n});"
        ]
      },
      {
        file: 'app/templates/foo.hbs',
        contains: '{{outlet}}'
      },
      {
        file: 'tests/unit/routes/foo-test.js',
        contains: [
          "import { moduleFor, test } from 'ember-qunit';",
          "moduleFor('route:foo'"
        ]
      },
      {
        file: 'app/models/foo.js',
        contains: [
          'import Model from \'ember-data/model\';',
          'export default Model.extend('
        ],
        doesNotContain: [
          'import attr from \'ember-data/attr\';',
          'import { belongsTo } from \'ember-data/relationships\';',
          'import { hasMany } from \'ember-data/relationships\';',
          'import { belongsTo, hasMany } from \'ember-data/relationships\';'
        ]
      },
      {
        file: 'tests/unit/models/foo-test.js',
        contains: [
          'moduleForModel(\'foo\''
        ]
      },
    ];

    return generateAndDestroy(['resource', 'foo'], {
      afterDestroy() {
        // remove `app/router.js` to work around https://github.com/ember-cli/ember-cli-blueprint-test-helpers/issues/38
        files.shift();
      },
      files: files,
    });
  });
});
