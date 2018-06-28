import Users from '../models/users';
import crypto from 'crypto';
import mongodb from 'mongodb';


// const users = new Users();

class UsersController {
    //Todos os Usuarios
    returnAll(req, res){
        // dbConnection();
        global.conn.collection('users').find().toArray(
            (err, docs) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ 'users': docs });
                }

            });
    };

    //Somente um Usuario
    returnUser(req, res){
        console.log(req.params.idUser);
        global.conn.collection('users').find(mongodb.ObjectId(req.params.idUser)).toArray(
            (err, docs) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ 'user': docs });
                }
            
            });
    };


    //Registra um Usuario
    register(req, res) {

        var user = req.body;

        if(!user.name.length) {
            res.status(500).json({ error: 'Name: field cannot be empty' });
            return;
        } else if(!user.email.length) {
            res.status(500).json({ error: 'Email: field cannot be empty' });
            return;
        } else if(!user.age.length || user.age < 5) {
            res.status(500).json({ error: 'Age: please, enter a valid value' });
            return;
        }  else if(!user.password.length || user.password < 8) {
            res.status(500).json({ error: 'Password: please, enter a valid value' });
            return;
        }

        var senha_criptografada = crypto.createHash("md5").update(user.password).digest('hex');

        user.password = senha_criptografada;

        global.conn.collection('users').insert(user, (err) => {
            if (err) {
                //Status: Internal Server Error
                res.status(500).json({ error: err });
            } else {
                //Status: Success
                res.status(200).json({ 'status': 'successful insertion' });
            }
        });
    };


}
export default UsersController;