'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         Arquivo não utilizado
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _dbConnection = require('../config/dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function findAll(callback) {
    global.conn.collection('users').find().toArray(callback);
}

function findUser(req, callback) {
    global.conn.collection('users').find((0, _mongodb2.default)(req.params.idUser)).toArray(callback);
}

function insertUser(user, callback) {
    var senha_criptografada = _crypto2.default.createHash("md5").update(user.password).digest('hex');

    user.password = senha_criptografada;
    console.log(user.password);
    global.conn.collection('users').insert(user, callback);
    //console.log(senha_criptografada);
}

////////////

var Users = function () {
    function Users() {
        _classCallCheck(this, Users);
    }

    _createClass(Users, [{
        key: 'returnUsers',

        //Retorna todos os usuarios


        value: function returnUsers(res) {
            console.log('aqui');
            (0, _dbConnection2.default)();
            findAll(function (err, docs) {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ 'users': docs });
                }
            });
        }

        //Retorna Somente um Usuario pelo ID

    }, {
        key: 'returnUser',
        value: function returnUser(req, res) {
            (0, _dbConnection2.default)();
            findUser(req, function (err, docs) {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({ 'user': docs });
                }
            });
        }

        //Registra um Usuario

    }, {
        key: 'registerUser',
        value: function registerUser(user, res) {
            (0, _dbConnection2.default)();
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
    }]);

    return Users;
}();
//TODO: UPDATE, DELETE

exports.default = Users;
//# sourceMappingURL=users.js.map