'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (application) {

    //Usuario envia Rotina
    application.route('/user/:idUser/routines').post(function (req, res) {
        global.conn.collection('users', function (err, collection) {
            collection.update({ _id: _mongodb2.default.ObjectId(req.params.idUser) }, { $push: {
                    routines: {
                        id_routine: new _mongodb2.default.ObjectId(),
                        title: req.body.title,
                        steps: req.body.steps
                    }

                }
            }, {}, function (err) {
                if (err) {
                    res.status(500).json({ 'error': err });
                } else {
                    res.status(200).json({ 'status': 'successful routine insertion' });
                }
            });
            if (err) {
                res.status(500).json({ 'error': err });
            }
        });
    });
    //Consulta Todas as Rotinas
    application.route('/user/:idUser/routines').get(function (req, res) {
        global.conn.collection('users').find(_mongodb2.default.ObjectId(req.params.idUser)).toArray(function (err, docs) {
            var routines = docs.routines;
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ 'user': docs });
            }
        });
    });
};

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routines.js.map