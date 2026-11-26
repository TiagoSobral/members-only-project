import express from 'express';
import path from 'node:path';
import passport from 'passport';
import './authentication/passport.js';

const app = express();
const PORT = 3000;
const __dirname = import.meta.dirname;
const assetsPath = path.join(__dirname, 'styles');

app.use(
	session({
		store: pool,
		secret: process.env.FOO_COOKIE_SECRET,
		resave: false,
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
