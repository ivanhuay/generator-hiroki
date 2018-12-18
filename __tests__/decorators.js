'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');
describe('generator-hiroki:decorator', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/decorator'))
            .withPrompts({
                modelName: 'examples'
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates decorators files', function() {
        assert.file('index.js');
        assert.file('examples.js');
    });
});
describe('generator-hiroki:decorator with previous files', function() {
    beforeAll(function() {
        return helpers.run(path.join(__dirname, '../generators/decorator'))
            .inTmpDir(function(dir) {
                const pathEnd = path.join(__dirname, './mocks/decorators/users.js');
                fs.copySync(pathEnd, path.join(dir, 'lib/decorators/users.js'));
            })
            .withPrompts({
                modelName: 'examples'
            })
            .toPromise()
            .then(() => {
                return;
            });
    });

    it('creates decorators files', function() {
        assert.file('examples.js');
        assert.file('index.js');
        assert.file('users.js');
    });
});
