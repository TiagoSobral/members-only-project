import { Router } from 'express';
import {
	validation,
	validationLoginFields,
	validationSignupFields,
} from '../controllers/validationController.js';
import { signUp } from '../controllers/signupControllers.js';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
	res.render('index');
});
indexRouter.get('/login', [validationLoginFields, validation], (req, res) => {
	res.render('index');
});
indexRouter.get('/sign-up', signUp);
indexRouter.post(
	'/sign-up',
	[validationSignupFields, validation],
	(req, res) => {
		res.render('sign-up');
	},
);

export { indexRouter };
