'use strict';

module.exports = function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'mandatory parameters not provided';
};

require('util').inherits(module.exports, Error);
