'use strict';

var _app = require('./src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen('8080', function () {
    console.log('app is running on port 8080');
});
//# sourceMappingURL=index.js.map