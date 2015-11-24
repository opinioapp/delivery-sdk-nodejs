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

describe('delivery_all:', function () {


    it('fails if no params are passed', function () {
        assert.throw(function () {
            deliveryService.deliveriesAll();
        }, InvalidOperationException);
    });

    it('fails if invalid params are passed', function () {
        deliveryService.deliveriesAll({
            start_date: '2015-6-6 222',
            end_date: '2015-4-333'
        }, function (error) {
            assert.typeOf(error, 'Error');
        });
    });

    it('successful for no date range', function () {
        deliveryService.deliveriesAll(null,
            function (error, req, body) {
                assert.isNull(error);
                assert.equal(req.statusCode, 200, 'api call failed');
                assert.isNotNull(body);
            });
    });

    it('successful for date range given', function () {
        deliveryService.cancelDelivery({
                start_date: '2015-08-01',
                end_date: '2015-10-03'
            },
            function (error, req, body) {
                assert.isNull(error);
                assert.equal(req.statusCode, 200, 'api call fail');
                assert.isNotNull(body);
            });
    });
});
