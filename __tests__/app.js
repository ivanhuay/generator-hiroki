'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
describe('generator-hiroki:app', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                createDirectory: false,
                jwt:false,
                name:'test'
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates files', function() {
        assert.file([
            'package.json',
            '.eslintrc',
            'lib/models/user.js',
            'lib/models/index.js',
            'lib/routes/index.js'
        ]);
    });
});
describe('generator-hiroki:app with jwt option', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                createDirectory: false,
                jwt:true
            })
            .toPromise();
    });

    it('creates jwt files', function() {
        assert.file([
            'package.json',
            '.eslintrc',
            'lib/models/user.js',
            'lib/models/index.js',
            'lib/routes/index.js',
            'lib/routes/extract-jwt.js',
            'lib/routes/auth.js'
        ]);
    });
});
