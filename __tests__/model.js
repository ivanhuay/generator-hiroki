'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
describe('generator-hiroki:model', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/model'))
            .withPrompts({
                modelName: 'examples',
                timestamps:true
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates model files', function() {
        assert.file('index.js');
        assert.file('examples.js');
    });
});
describe('generator-hiroki:model with previous files', function() {
    beforeAll(function() {
        console.log(__dirname, './generators/users.js');
        return helpers.run(path.join(__dirname, '../generators/model'))
            .withPrompts({
                modelName: 'examples',
                timestamps:true
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates model files', function() {
        assert.file('index.js');
        assert.file('examples.js');
    });
});
