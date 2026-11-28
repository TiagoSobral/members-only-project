import { Router } from 'express';
import {
	validation,
	validationSignupFields,
} from '../controllers/validationController.js';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
	res.render('index');
});
indexRouter.get(
	'/sign-up',
	[validationSignupFields, validation],
	(req, res) => {
		res.render('sign-up');
	},
);

export { indexRouter };
