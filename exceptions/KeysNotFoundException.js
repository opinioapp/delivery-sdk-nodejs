'use strict';

module.exports = function (message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'AccessKeyId or Secret Key  is missing';
};

require('util').inherits(module.exports, Error);
