'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMultiparty = require('connect-multiparty');

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

var _expressFileupload = require('express-fileupload');

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _connectBusboy = require('connect-busboy');

var _connectBusboy2 = _interopRequireDefault(_connectBusboy);

var _busboyBodyParser = require('busboy-body-parser');

var _busboyBodyParser2 = _interopRequireDefault(_busboyBodyParser);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _videos = require('./routes/videos');

var _videos2 = _interopRequireDefault(_videos);

var _routines = require('./routes/routines');

var _routines2 = _interopRequireDefault(_routines);

var _dbConnection = require('./config/dbConnection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import consign from 'consign';

var app = (0, _express2.default)();

// global.db = require('./config/dbConnection');

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _connectMultiparty2.default)());

app.use((0, _connectBusboy2.default)());

app.use((0, _busboyBodyParser2.default)());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

/* configurar o middleware express-validator */
app.use((0, _expressValidator2.default)());

/* configura o middleware express-session */
app.use((0, _expressSession2.default)({
    secret: 'hakjehrgkjahjer',
    resave: false,
    saveUninitialized: false
}));

app.get('/teste', function (req, res) {
    console.log('ok ok');
    res.send('ok');
});

(0, _dbConnection2.default)();
(0, _users2.default)(app);
(0, _videos2.default)(app);
(0, _routines2.default)(app);

exports.default = app;
//# sourceMappingURL=app.js.map