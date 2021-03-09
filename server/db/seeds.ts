import 'dotenv/config';
import sqlFixtures from 'sql-fixtures';
import { encryptPassword } from '../src/lib/password';
import { Client } from 'pg';
import users from '../../cypress/fixtures/db/user';

const env = process.env.NODE_ENV || 'test';

const dbUrl =
  env === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;

const main = async () => {
  const data = {
    user: await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await encryptPassword(user.password),
      })),
    ),
  };

  const db = new Client({ connectionString: dbUrl });
  await db.connect();
  await Promise.all(
    Object.keys(data).map((table) =>
      db.query(`TRUNCATE TABLE "${table}" CASCADE`),
    ),
  );
  db.end();

  sqlFixtures.create(
    {
      client: 'pg',
      connection: dbUrl,
    },
    data,
    (err) => {
      if (err) console.error(err);
      else console.log('Seeds were applied successfully');
      sqlFixtures.destroy();
    },
  );
};
main();
