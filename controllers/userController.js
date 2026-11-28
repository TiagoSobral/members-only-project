import { hashPassword } from '../authentication/crypt';
import { addUser } from '../db/queries';

async function newUser(req, res) {
	const { firstName, lastName, username, password } = req.body;
	const hashedPassword = hashPassword(password);
	await addUser(firstName, lastName, username, false, hashedPassword);
	res.redirect('/');
}

export { newUser };
