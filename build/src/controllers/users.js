'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const users = new Users();

var UsersController = function () {
    function UsersController() {
        _classCallCheck(this, UsersController);
    }

    _createClass(UsersController, [{
        key: 'returnAll',

        //Todos os Usuarios
        value: function returnAll(req, res) {
            // dbConnection();
            global.conn.collection('users').find().toArray(function (err, docs) {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ 'users': docs });
                }
            });
        }
    }, {
        key: 'returnUser',


        //Somente um Usuario
        value: function returnUser(req, res) {
            console.log(req.params.idUser);
            global.conn.collection('users').find(_mongodb2.default.ObjectId(req.params.idUser)).toArray(function (err, docs) {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ 'user': docs });
                }
            });
        }
    }, {
        key: 'register',


        //Registra um Usuario
        value: function register(req, res) {

            var user = req.body;

            if (!user.name.length) {
                res.status(500).json({ error: 'Name: field cannot be empty' });
                return;
            } else if (!user.email.length) {
                res.status(500).json({ error: 'Email: field cannot be empty' });
                return;
            } else if (!user.age.length || user.age < 5) {
                res.status(500).json({ error: 'Age: please, enter a valid value' });
                return;
            } else if (!user.password.length || user.password < 8) {
                res.status(500).json({ error: 'Password: please, enter a valid value' });
                return;
            }

            var senha_criptografada = _crypto2.default.createHash("md5").update(user.password).digest('hex');

            user.password = senha_criptografada;

            global.conn.collection('users').insert(user, function (err) {
                if (err) {
                    //Status: Internal Server Error
                    res.status(500).json({ error: err });
                } else {
                    //Status: Success
                    res.status(200).json({ 'status': 'successful insertion' });
                }
            });
        }
    }]);

    return UsersController;
}();

exports.default = UsersController;
//# sourceMappingURL=users.js.map