import { Client } from 'pg';

const initialScript = `
CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firsName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  member_status BOOLEAN NOT NULL DEFAULT TRUE,
  user_password VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS messages  (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  message_text TEXT NOT NULL,
  message_date DATE DEFAULT CURRENT_DATE
)
;
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});
	await client.connect();
	await client.query(initialScript);
	await client.end();
	console.log('done');
}

main();
