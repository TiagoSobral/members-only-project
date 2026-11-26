import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from '../db/pool.js';
import { comparePassword } from './crypt.js';

// this function checks whether the username and password match
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
		// user is passed through serialize as part of passport
	} catch (error) {
		done(error);
	}
}

const strategy = new LocalStrategy(verify);

passport.use(strategy);

// registers user.id to the session only once the login is successful due to done(null, user)
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// runs thereafter and takes the user full information and sets as req.use. id comes from serialize user.id
passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = pool.query('SELECT * FROM users WHERE id = $1', [id]);
		const user = rows[0];

		done(null, user);
	} catch (error) {
		done(error);
	}
});
