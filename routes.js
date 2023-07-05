import express from 'express';
import {pingController} from './controllers/pingController.js';

export const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Ping Pong RESTful API'
	});
});

router.get('/ping', pingController);
