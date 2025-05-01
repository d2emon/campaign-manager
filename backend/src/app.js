import express from 'express';
// import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';

import * as errorHandlers from './handlers/error.js';
import config from './helpers/config.js';

import indexRouter from './routes/index.js';
import campaignRouter from './routes/campaign.js';
import locationRouter from './routes/location.js';
import noteRouter from './routes/note.js';
import npcRouter from './routes/npc.js';
import questRouter from './routes/quest.js';
import usersRouter from './routes/users.js';

const app = express();

if (process.env.NODE_ENV === 'production') {
  const corsOptions = {
    origin: config.FRONT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
} else {
  app.use(cors());
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/campaigns', campaignRouter);
app.use('/api/v1/location', locationRouter);
app.use('/api/v1/note', noteRouter);
app.use('/api/v1/npc', npcRouter);
app.use('/api/v1/quest', questRouter);
app.use('/auth', usersRouter);

app.use(errorHandlers.error404);
app.use(errorHandlers.logError);
app.use(errorHandlers.defaultError);

export default app;
