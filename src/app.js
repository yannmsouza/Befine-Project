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
import Busboy from 'busboy';
import fs from 'fs';

import users from './routes/users';
import dbConnection from './config/dbConnection';


const app = express();

// global.db = require('./config/dbConnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

app.use((req, res, next) =>{
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
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


users(app);
dbConnection();

export default app;