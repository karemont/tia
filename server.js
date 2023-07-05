import express from 'express';
import {router} from './routes.js';
import {pingController} from './controllers/pingController.js';

const app = express();
app.set('view engine', 'ejs');


// Routes
app.use('/', router);


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log('Server is running on port ', port);
});
