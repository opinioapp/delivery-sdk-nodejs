require('./exceptions');

var request = require('request'),
    urlBuilder = require('urijs'),
    Joi = require('joi');


var OpinioDelivery = function () {
};

OpinioDelivery.setup = function (options) {
    this.auth = require('./auth');
    this.config = require('./config');
    var requestHost;

    if (options && options.auth) {
        if (options.hasOwnProperty('test')) {
            requestHost = options.test ? this.config.bed.test : this.config.bed.prod;
        } else {
            requestHost = this.config.bed.prod;
        }
        this.encoder = this.auth.createInstance(options.auth);
    } else {
        throw new PluginNotSetupException();
    }

    this.uri = new urlBuilder(requestHost);
};

OpinioDelivery.requestDelivery = function (formData, callback) {
    var requestConfig = this.config.methods.requestDelivery;
    var self = this;
    var requestEndPoint = this.uri
        .resource(requestConfig.resource)
        .toString();

    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!formData) {
        return callback(new InvalidOperationException());
    }

    return Joi.validate(formData,
        requestConfig.schema,
        function (err) {
            if (err) {
                return callback(err);
            } else {
                var requestInfo = {
                    method: requestConfig.httpVerb,
                    url: requestEndPoint,
                    form: formData,
                    headers: {
                        'Authorization': ''
                    }
                };
                return request(self.encoder.sign(requestInfo), callback);
            }
        });
};

OpinioDelivery.updateDelivery = function (formData, callback) {
    var requestConfig = this.config.methods.updateDelivery;
    var self = this;
    var requestEndPoint = this.uri
        .resource(requestConfig.resource)
        .segmentCoded(formData.order_code.toString())
        .toString();

    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!formData) {
        return callback(new InvalidOperationException());
    }

    return Joi.validate(formData,
        requestConfig.schema,
        function (err) {
            if (err) {
                return callback(err);
            } else {
                delete formData['order_code'];
                var requestInfo = {
                    method: requestConfig.httpVerb,
                    url: requestEndPoint,
                    form: formData,
                    headers: {
                        'Authorization': ''
                    }
                };
                return request(self.encoder.sign(requestInfo), callback);
            }
        });
};

OpinioDelivery.cancelDelivery = function (formData, callback) {
    var requestConfig = this.config.methods.cancelDelivery;
    var self = this;

    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!formData) {
        return callback(new InvalidOperationException());
    }

    return Joi.validate(formData,
        requestConfig.schema,
        function (err) {
            if (err) {
                return callback(err);
            } else {
                var requestResource = requestConfig.resource + '/' + formData.order_code;
                var requestEndPoint = self.uri
                    .resource(requestResource)
                    .toString();
                var form = {};
                form.is_cancelled = 1;
                if (formData.cancel_reason && formData.cancel_reason.trim().length !== 0) {
                    form.cancel_reason = formData.cancel_reason;
                }

                var requestInfo = {
                    method: requestConfig.httpVerb,
                    url: requestEndPoint,
                    form: form,
                    headers: {
                        'Authorization': ''
                    }
                };
                return request(self.encoder.sign(requestInfo), callback);
            }
        });
};

OpinioDelivery.deliveryStatus = function (orderCode, callback) {

    var requestConfig = this.config.methods.deliveryStatus;
    var self = this;
    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!orderCode) {
        return callback(new InvalidOperationException());
    }

    var requestResource = requestConfig.resource + '/' + orderCode;

    var requestEndPoint = this.uri
        .resource(requestResource)
        .toString();

    var requestOption = {
        method: requestConfig.httpVerb,
        url: requestEndPoint,
        headers: {
            'Authorization': ''
        }
    };

    return request(self.encoder.sign(requestOption), callback);
};

OpinioDelivery.deliveriesAll = function (formdata, callback) {


    var self = this;
    var requestConfig = this.config.methods.deliveriesAll;

    if (!callback) {
        throw new InvalidOperationException();
    }

    var requestEndPoint = this.uri
        .resource(requestConfig.resource)
        .toString();

    if (formdata == null || Object.keys(formdata).length === 0) {
        var requestOption = {
            method: requestConfig.httpVerb,
            url: requestEndPoint,
            headers: {
                'Authorization': ''
            }
        };
        return request(self.encoder.sign(requestOption), callback);
    } else {
        return Joi.validate(formdata,
            requestConfig.schema,
            function (err) {
                if (err) {
                    return callback(err);
                } else {
                    var requestOption = {
                        method: requestConfig.httpVerb,
                        url: requestEndPoint,
                        qs: formdata,
                        headers: {
                            'Authorization': '',
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    };

                    return request(self.encoder.sign(requestOption), callback);
                }
            });
    }
};

OpinioDelivery.registerMerchant = function (formData, callback) {
    var requestConfig = this.config.methods.registerMerchant;
    var self = this;
    var requestEndPoint = this.uri
        .resource(requestConfig.resource)
        .toString();

    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!formData) {
        return callback(new InvalidOperationException());
    }

    return Joi.validate(formData,
        requestConfig.schema,
        function (err) {
            if (err) {
                return callback(err);
            } else {
                var requestInfo = {
                    method: requestConfig.httpVerb,
                    url: requestEndPoint,
                    form: formData,
                    headers: {
                        'Authorization': ''
                    }
                };
                return request(self.encoder.sign(requestInfo), callback);
            }
        });
};

OpinioDelivery.serviceability = function (merchant, callback) {
    var requestConfig = this.config.methods.serviceability;
    var self = this;

    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!merchant) {
        return callback(new InvalidOperationException());
    }

    var requestEndPoint = this.uri
        .resource(requestConfig.resource)
        .toString();

    var requestInfo = {
        method: requestConfig.httpVerb,
        url: requestEndPoint,
        qs: {
            merchant_id: merchant,
            eta: 1
        },
        headers: {
            'Authorization': ''
        }
    };
    return request(self.encoder.sign(requestInfo), callback);
};

OpinioDelivery.supportedLocalities = function (merchantId, callback) {

    var requestConfig = this.config.methods.supportedLocalities;

    if (!callback) {
        throw new InvalidOperationException();
    }

    if (!merchantId) {
        return callback(new InvalidOperationException());
    }


    var requestEndPoint = this.uri
        .resource(requestConfig.resource)
        .segmentCoded(merchantId.toString())
        .toString();

    var requestOption = {
        method: requestConfig.httpVerb,
        url: requestEndPoint,
        headers: {
            'Authorization': ''
        }
    };

    return request(this.encoder.sign(requestOption), callback);
};

module.exports = OpinioDelivery;


