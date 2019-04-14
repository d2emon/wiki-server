import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';

// import db from './db/mongo';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => console.log('MongoDB connected'));

app.use('/api', indexRouter);

export default app;
