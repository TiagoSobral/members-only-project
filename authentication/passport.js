import { session } from 'express-session';
import passport, { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from '../db/pool';
import { comparePassword } from './crypt';

async function verify(username, password, done) {
	try {
		const { rows } = pool.query('SELECT * FROM users WHERE username = $1', [
			username,
		]);
		const user = rows[0];
		const isValid = await comparePassword(password);

		if (!user) {
			return done(null, false, { message: 'Incorrect username' });
		}
		if (!isValid) {
			return done(null, false, { message: 'Incorrect password' });
		}
		return done(null, user);
	} catch (error) {
		done(error);
	}
}

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = pool.query('SELECT * FROM users WHERE id = $1', [id]);
		const user = rows[0];

		done(null, user);
	} catch (error) {
		done(error);
	}
});
