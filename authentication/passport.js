import { session } from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from '../db/pool';
import { comparePassword } from './crypt';

passport.use(
	session({
		store: pool,
		secret: process.env.FOO_COOKIE_SECRET,
		resave: false,
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
	}),
);

async function verify(username, password, done) {
	try {
		const { rows } = pool.query('SELECT * FROM users WHERE username = ?', [
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
