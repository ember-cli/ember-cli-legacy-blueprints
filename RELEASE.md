# Release Instructions

This project is using [TravisCI](https://travis-ci.org/) to automatically
publish git tags to [npm](https://www.npmjs.com/).

Follow these steps to create a new release:

1) `yarn version` – updates the `version` property in the `package.json`
   file and creates a new git commit and tag for the release

2) `git push upstream master --follow-tags` – pushes the release commit and
   tag to the `upstream` remote

3) Wait for TravisCI to finish the build, tests and deployment

Note that for `yarn version` to work properly the `version` field should not
be adjusted manually before the release.
