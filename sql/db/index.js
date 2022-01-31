const Knex = require('knex');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig["production"]);

module.exports = knex;