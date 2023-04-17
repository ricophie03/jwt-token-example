const { createConnection } = require('typeorm');
const {UserSchema} = require('../entities/user');

async function connectToDatabase() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'birthday_reminders',
    entities: [UserSchema],
    synchronize: true,
  });

  return connection;
}

module.exports = { connectToDatabase };