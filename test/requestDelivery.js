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

describe('delivery_request_creation:', function () {

    it('fails if no params are passed', function () {
        assert.throw(function () {
            deliveryService.requestDelivery();
        }, InvalidOperationException);
    });


    it('fails for {} form data', function () {
        deliveryService.requestDelivery({},
            function (error) {
                assert.typeOf(error, 'Error');
            });
    });

    it('fails for null form data', function () {
        deliveryService.requestDelivery(null,
            function (error) {
                assert(error instanceof Error);
            });
    });


    it('fails for missing mandatory params  in form data', function () {
        deliveryService.requestDelivery({
            merchant_id: 3,
            amount: 300,
            amount_to_pay: 300,
            phone: '9916263644'
        }, function (error) {
            assert.typeOf(error, 'Error');
        });
    });

    it('fails for missing mandatory params  in form data', function () {
        deliveryService.requestDelivery({
            merchant_id: 3,
            amount: 300,
            amount_to_pay: 300,
            phone: '9916263644'
        }, function (error) {
            assert.typeOf(error, 'Error');
        });
    });

    it('successful for min mandatory params  in form data', function () {
        deliveryService.requestDelivery({
            merchant_id: 3,
            amount: 300,
            amount_to_pay: 300,
            phone: '9916263644',
            address: '221B Baker Street',
            locality: 'london'
        }, function (error, response, body) {
            assert.isNull(error);
            assert.equal(response.statusCode, 201 , 'error on api call');
            assert.isNotNull(body);
        });
    });
});
