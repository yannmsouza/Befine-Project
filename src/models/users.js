/*
    Arquivo não utilizado
*/

import crypto from 'crypto';
import objectId from 'mongodb';
import dbConnection from '../config/dbConnection';


function findAll(callback) {
    global.conn.collection('users').find().toArray(callback);
}

function findUser(req, callback) {
    global.conn.collection('users').find(objectId(req.params.idUser)).toArray(callback);
}

function insertUser(user, callback) {
    var senha_criptografada = crypto.createHash("md5").update(user.password).digest('hex');
    
    user.password = senha_criptografada;
    console.log(user.password);
    global.conn.collection('users').insert(user, callback);
    //console.log(senha_criptografada);
}

////////////

class Users {
    //Retorna todos os usuarios


    returnUsers(res){
        console.log('aqui');
        dbConnection();
        findAll((err, docs) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ 'users': docs });
            }
        })

    }

    //Retorna Somente um Usuario pelo ID
    returnUser(req, res){
        dbConnection();
        findUser(req, (err, docs) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ 'user': docs });
            }
        })

    }

    //Registra um Usuario
    registerUser(user, res) {
        dbConnection();
        insertUser(user, function (err) {
            if (err) {
                //Status: Internal Server Error
                res.status(500).json({ error: err });
            } else {
                //Status: Success
                res.status(200).json({ 'status': 'successful insertion' });
            }

        });

    }
}
//TODO: UPDATE, DELETE

export default Users;