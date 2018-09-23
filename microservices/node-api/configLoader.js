'use strict';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const env = process.env.NODE_ENV;

console.log(`Node environment: ${env}`);
console.log(`loading config ${env}.environment.js`);

module.exports = require(`./env/${env}.environment.js`);
