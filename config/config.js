'use strict';
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  development: {
    username: 'neondb_owner',
    password: 'npg_2VvQXNZ4WcMz',
    database: 'neondb',
    host: 'ep-sparkling-snow-axla0tl8-pooler.c-4.us-east-2.aws.neon.tech',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};