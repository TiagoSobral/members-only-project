import { body, validationResult } from 'express-validator';

const validationLoginFields = [
	body('loginUsername').trim().notEmpty().withMessage('username is empty'),
	body('loginPassword').trim().notEmpty().withMessage('password is empty'),
];

const validationSignupFields = [
	body('firstName').trim().notEmpty().withMessage('name required'),
	body('lastName').trim().notEmpty().withMessage('Username required'),
	body('signupUsername')
		.trim()
		.notEmpty()
		.withMessage('username is empty')
		.isEmail()
		.withMessage('username must an email'),
	body('signupPassword')
		.trim()
		.notEmpty()
		.withMessage('password is empty')
		.isStrongPassword({
			minLength: 8,
			minLowercase: 2,
			minUppercase: 2,
			minNumbers: 2,
			returnScore: true,
		}),
	body('confirmPassword').trim().notEmpty().withMessage('this field is empty'),
];

function validation(req, res) {
	let route = req.route.path;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		if (route == '/login') {
			return res.status(400).render('index', {
				errors: errors.array(),
			});
		}
		return res.status(400).render('sign-up', {
			errors: errors.array(),
		});
	}
}

export { validationLoginFields, validationSignupFields, validation };
