import express from 'express';
import dotenv from 'dotenv';
// import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import * as errorHandlers from './handlers/error.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import campaignRouter from './routes/campaign.js';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(`${process.env.MONGO_DATABASE}`)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/campaigns', campaignRouter);

app.use(errorHandlers.error404);
app.use(errorHandlers.logError);
app.use(errorHandlers.defaultError);

export default app;
