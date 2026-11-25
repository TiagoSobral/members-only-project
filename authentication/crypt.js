import bcrypt from 'bcrypt';

const saltRound = 10;

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(saltRound);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

async function comparePassword(password) {
	const hash = hashPassword(password);
	const match = bcrypt.compare(password, hash);
	return match;
}

export { hashPassword, comparePassword };
