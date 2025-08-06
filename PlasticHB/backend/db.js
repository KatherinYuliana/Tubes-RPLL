const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'plastichb',
  password: 'dbms',
  port: 5432,
});

module.exports = pool;
