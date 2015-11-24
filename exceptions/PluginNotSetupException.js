'use strict';

module.exports = function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'plugin is not initialized';
};

require('util').inherits(module.exports, Error);
