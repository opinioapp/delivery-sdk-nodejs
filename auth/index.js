require('../exceptions');

var crypto = require('crypto'),
    config = require('../config'),
    queryParameter = require("./queryParameter"),
    URI = require('urijs');

var opinioAuthenticate = function (options) {

    if (!options) {
        throw new KeysNotFoundException();
    }

    var accessKey = '';
    var secretKey = '';

    if (options.AccessKeyId && options.AccessKeyId.trim().length !== 0) {
        accessKey = options.AccessKeyId;
    } else {
        throw new KeysNotFoundException('Access Key Missing ');
    }

    if (options.SecretKey && options.SecretKey.trim().length !== 0) {
        secretKey = options.SecretKey;
    } else {
        throw new KeysNotFoundException('Secret Key Missing');
    }

    var createHmacSignature = function (request) {
        var requestData = createCanonicalizedRequestData(request);
        var uri = new URI(request.url);
        var host = uri.hostname().toLowerCase();
        var action = uri.pathname().toLowerCase();

        var text =
            request.method + "\n"
            + host + "\n" +
            action + "\n" +
            accessKey + "\n" +
            requestData + "\n" +
            "&SignatureVersion=" + config.signatureVersion + "\n" +
            "&SignatureMethod=" + config.signatureMethod;
        var hash = crypto
            .createHmac(config.signingAlgorithm, secretKey)
            .update(new Buffer(text, 'utf-8'))
            .digest('base64');

        request.headers.Authorization = config.authHeaderTemplate.replace('@#SIGNATURE', accessKey + ':' + hash);
        return request;
    };

    var createCanonicalizedRequestData = function (request) {
        var requestData = '';
        if (request.hasOwnProperty('form')) {
            requestData += queryParameter.normalize(request.form);
        }

        if (request.hasOwnProperty('qs')) {
            requestData += queryParameter.normalize(request.qs);
        }

        return requestData;
    };
    this.sign = function (request) {
        return createHmacSignature(request);
    };

    return this;
};

module.exports = {
    createInstance: opinioAuthenticate
};






