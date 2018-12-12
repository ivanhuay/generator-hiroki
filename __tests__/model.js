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
        return helpers.run(path.join(__dirname, '../generators/model'))
            .inDir(path.join(__dirname), function(dir) {
                this.fs.copy(
                    path.join(__dirname, './generators/users.js'),
                    dir + 'users.js'
                );

                var test = this.fs.read(dir + 'users.js');
                console.log('test: ' + test);
            })
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
