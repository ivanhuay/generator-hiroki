'use strict';
const publicPaths = ['api/auth/login', 'api/auth/signup'];

const prefix = '^\/';
const pathRegexStr = prefix + publicPaths.map((path) => {
    return `(?!${path})`;
}).join('') + '.*';

const pathRegex = new RegExp(pathRegexStr, 'i');

module.exports = {
    publicPaths,
    pathRegex
};
