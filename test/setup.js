var should = require('chai').should();
var deliveryService = require('../index');
var assert = require('chai').assert;

require('../exceptions');

describe('delivery_sdk_setup', function () {

    it('fails for empty {} options array', function () {
        assert.throw(function () {
            new deliveryService.setup({});
        }, PluginNotSetupException);
    });

    it('fails for null options array', function () {
        assert.throw(function () {
            new deliveryService.setup();
        }, PluginNotSetupException);
    });

    it('fails for missing secret key', function () {
        assert.throw(function () {
            new deliveryService.setup({
                auth: {
                    AccessKeyId: 'test'
                }
            });
        }, KeysNotFoundException);
    });


    it('fails for missing access key', function () {
        assert.throw(function () {
            new deliveryService.setup({
                auth: {
                    SecretKey: 'test'
                }
            });
        }, KeysNotFoundException);
    });

    it('successful for options with auth only', function () {
        assert.doesNotThrow(function () {
            new deliveryService.setup({
                auth: {
                    AccessKeyId: 'test',
                    SecretKey: 'test'
                }
            });
        });
    });

    it('successful for complete options', function () {
        assert.doesNotThrow(function () {
            new deliveryService.setup({
                auth: {
                    AccessKeyId: 'test',
                    SecretKey: 'test'
                },
                test: true
            });
        });
    });
});