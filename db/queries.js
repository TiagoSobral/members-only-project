import { pool } from './pool';

async function addUser(firstName, lastName, userName, member_status, password) {
	pool.query(
		'INSERT INTO users(firstName, lastName, username, member_status, user_password) VALUES($1, $2, $3, $4, $5)',
		[firstName, lastName, userName, member_status, password],
	);
}

export { addUser };
