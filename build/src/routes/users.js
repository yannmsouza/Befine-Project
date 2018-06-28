'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (application) {

    application.route('/').get(function (res) {
        console.log('ok ok');
        res.status(200).json({ 'ok': 'ok' });
    });

    //Cadastro Usuario
    application.route('/user').post(function (req, res) {
        console.log('cadastro ok');
        users.register(req, res);
    });

    // Rota para Recuperar Dados dos Usuarios
    application.get('/users', function (req, res) {
        console.log('busca ok');
        users.returnAll(req, res);
    });

    // Rota para Recuperar Dados do Usuario pelo ID
    application.get('/user/:idUser', function (req, res) {
        //console.log('chegou aqui get');
        users.returnUser(req, res);
    });
};

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = new _users2.default();
//# sourceMappingURL=users.js.map