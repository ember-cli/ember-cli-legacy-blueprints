# ember-cli-legacy-blueprints

This addon provides blueprint support for ember-cli ^2.0.0 projects that are importing Ember and Ember Data through bower.js. Projects that are using Ember and Ember Data as addons (imported from npm as dependencies through package.json) do not need this addon to provide blueprints, as the related blueprints are provided by the respective addons.

## Blueprints provided by Ember addon

* component
* component-addon
* component-test
* controller
* controller-test
* helper
* helper-addon
* helper-test
* initializer
* initializer-addon
* intializer-test
* mixin
* mixin-test
* resource
* route
* route-addon
* route-test
* service
* service-test
* template
* util
* util-test
* view
* view-test

## Blueprints provided by Ember Data addon

* adapter
* adapter-test
* model
* model-test
* serializer
* serializer-test
* transform
* transform-test

## Installation

From your project root, run: `ember install ember-cli-legacy-blueprints`

## Developing

* `git clone` this repository
* `npm install`
* `bower install`
* `npm link`

Because the nature of this project, it requires 
* From your project root run `npm link ember-cli-legacy-blueprints`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
