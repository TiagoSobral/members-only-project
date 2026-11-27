import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
	res.render('index');
});
indexRouter.get('/sign-up', (req, res) => {
	res.render('sign-up');
});

export { indexRouter };
