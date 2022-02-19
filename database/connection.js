const knex = require('knex').knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gestionepilates',
  },
  pool: { min: 0, max: 10 },
});

module.exports = { knex };
