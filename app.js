import express from 'express';
import path from 'node:path';
import passport from 'passport';
import session from 'express-session';
import './authentication/passport.js';
import { pool } from './db/pool.js';
import { indexRouter } from './routes/indexRouter.js';
import connectPgSimple from 'connect-pg-simple';

const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;
const assetsPath = path.join(__dirname, 'styles');
const PgSession = connectPgSimple(session);

// creates a session table for the database to store session data in a postgresql database
app.use(
	session({
		store: new PgSession({
			pool: pool,
		}),
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
	}),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use('/', indexRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, (error) => {
	if (error) {
		throw error;
	}
	console.log(`listening on port ${PORT}`);
});
