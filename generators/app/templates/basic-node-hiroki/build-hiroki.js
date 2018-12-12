'use strict';

const hiroki = require('hiroki');
const models = require('./lib/models');
const decorators = require('./lib/decorators');

function buildHiroki() {
    Object.keys(models).forEach((key) => {
        if (Object.keys(decorators).indexOf(key) !== -1) {
            decorators[key](hiroki.rest(key));
        } else {
            hiroki.rest(key);
        }
    });
    return hiroki.build();
}

module.exports = buildHiroki;
