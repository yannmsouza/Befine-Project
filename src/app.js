import express from 'express';
// import consign from 'consign';

import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import expressSession from 'express-session';
import multiparty from 'connect-multiparty';
import uploadVideos from "express-fileupload";
import multer from 'multer';
import http from 'http';
import path from 'path';
import os from 'os';

import fs from 'fs';

import busboy from 'connect-busboy';
import busboyBodyParser from 'busboy-body-parser';

import users from './routes/users';
import videos from './routes/videos';
import routines from './routes/routines';
import dbConnection from './config/dbConnection';


const app = express();

// global.db = require('./config/dbConnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

app.use(busboy());

app.use(busboyBodyParser());

app.use((req, res, next) =>{
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configura o middleware express-session */
app.use(expressSession({
    secret: 'hakjehrgkjahjer',
    resave: false,
    saveUninitialized: false
}));

app.get('/teste',  (req, res) =>  {
    console.log('ok ok');
    res.send('ok');
});


dbConnection();
users(app);
videos(app);
routines(app);


export default app;