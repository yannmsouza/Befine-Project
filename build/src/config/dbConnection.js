'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    _mongodb2.default.connect('mongodb://befine-admin:befine123@ds237700.mlab.com:37700/banco-befine').then(function (conn) {
        return global.conn = conn.db('banco-befine');
    }, function () {
        console.log('conexao realizada');
    }).catch(function (err) {
        return console.log(err);
    });
};

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=dbConnection.js.map