'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _busboy = require('busboy');

var _busboy2 = _interopRequireDefault(_busboy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uploadsPath = './uploads';

var VideosController = function () {
        function VideosController() {
                _classCallCheck(this, VideosController);
        }

        _createClass(VideosController, [{
                key: 'sendVideos',
                value: function sendVideos(req, res) {
                        var busboy = new _busboy2.default({ headers: req.headers });

                        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                                console.log('video ok 0');

                                var saveTo = _path2.default.join(uploadsPath, _path2.default.basename(fieldname) + '.mp4');
                                console.log('video ok 1 ' + saveTo);

                                file.pipe(_fs2.default.createWriteStream(saveTo));
                        });

                        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
                                console.log('Field [' + fieldname + ']: value: ' + inspect(val));
                        });

                        busboy.on('finish', function () {

                                console.log(req.body);

                                var saveTo = _path2.default.join('' + uploadsPath, _path2.default.basename('' + fieldname) + '.mp4');
                                console.log('video ok 1 ' + saveTo);

                                file.pipe(_fs2.default.createWriteStream(saveTo));

                                res.writeHead(200, { 'Connection': 'close' });
                                res.end("That's all folks!!");
                        });

                        return req.pipe(busboy);
                }
        }, {
                key: 'streamVideos',
                value: function streamVideos(req, res) {
                        console.log('aqui videos stream');

                        //Realizar consulta, encontrar videos

                        res.writeHead(200, { 'Content-Type': 'video/mp4' });

                        var rs = _fs2.default.createReadStream(uploadsPath + '/cat.mp4');

                        rs.pipe(res);
                }
        }]);

        return VideosController;
}();

exports.default = VideosController;
//# sourceMappingURL=videos.js.map