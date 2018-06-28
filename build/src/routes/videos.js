'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (application) {

    //Usuario envia Video
    application.route('/user/:idUser/videos').post(function (req, res) {
        var uploadsPath = './uploads';

        // console.log(req.files);
        var date = new Date();

        var timeStamp = date.getTime();

        var nameVideo = req.files.file.name;
        var fieldname = req.params.idUser + '_' + timeStamp + '_' + nameVideo;
        var pathVideo = fieldname;

        var saveTo = _path2.default.join(uploadsPath, _path2.default.basename(fieldname));
        console.log('video ok 1 ' + saveTo);

        _fs2.default.createWriteStream(saveTo).end(function (err) {
            if (err) {
                res.status(500).json({ 'error': err });
            } else {
                global.conn.collection('users', function (err, collection) {
                    collection.update({ _id: _mongodb2.default.ObjectId(req.params.idUser) }, { $push: {
                            videos: {
                                path: pathVideo,
                                title: nameVideo
                            }

                        }
                    }, {}, function (err, records) {
                        if (err) {
                            res.status(500).json({ 'error': err });
                        } else {
                            res.status(200).json({ 'status': 'successful video insertion' });
                        }
                    });
                });

                // res.status(200).json({'status': 'successful video insertion'});
            }
        });
    });

    // Rota para Retorno da Lista de Videos do Usuario
    application.get('/user/:idUser/videos', function (req, res) {
        console.log('stream videos');
        videos.streamVideos(req, res);
    });
};

var _videos = require('../controllers/videos');

var _videos2 = _interopRequireDefault(_videos);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var videos = new _videos2.default();
//# sourceMappingURL=videos.js.map