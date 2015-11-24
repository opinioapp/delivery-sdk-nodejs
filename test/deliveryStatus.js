var deliveryService = require('../index');
deliveryService.setup({
    auth: {
        AccessKeyId: '<AccessKeyId_From_Opinio>',
        SecretKey: '<Secret_Key_From_Opinio>'
    },
    test: true
});

var assert = require('chai').assert;

require('../exceptions');

describe('delivery_status:', function () {


    it('fails if no params are passed', function () {
        assert.throw(function () {
            deliveryService.deliveryStatus();
        }, InvalidOperationException);
    });

    it('fails for null order code', function () {
        deliveryService.deliveryStatus(null,
            function (error) {
                assert(error instanceof Error);
            });
    });

    it('successful for order code given', function () {
        deliveryService.deliveryStatus(223322,
            function (error, req, body) {
                assert.isNull(error);
                assert.equal(req.statusCode, 200, 'api call fail');
                assert.isNotNull(body);
            });
    });
});
