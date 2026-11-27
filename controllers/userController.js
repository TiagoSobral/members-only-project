import { body } from 'express-validator';

const validationLoginFields = [
	body('loginUsername')
		.trim()
		.notEmpty()
		.withMessage('Username cannot be empty'),
	body('loginPassword')
		.trim()
		.notEmpty()
		.withMessage('Password cannot be empty'),
];

const validationSignupFields = [
	body('signupUsername')
		.trim()
		.notEmpty()
		.withMessage('Username required')
		.isEmail()
		.withMessage('Username must be your email'),
	body('signupPassword')
		.trim()
		.notEmpty()
		.withMessage('password cannot be empty')
		.isStrongPassword({
			minLength: 8,
			minLowercase: 2,
			minUppercase: 2,
			minNumbers: 2,
			returnScore: true,
		}),
	body('confirmPassword')
		.trim()
		.notEmpty()
		.withMessage('this field cannot be empty'),
];
