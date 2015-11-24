// require the module
var deliveryService = require('../index');

// Mandatory setup
// leads to fatal/non-recoverable  exception if not done
deliveryService.setup({
    // mandatory
    auth: {
        AccessKeyId: '<AccessKeyId_From_Opinio>',
        SecretKey: '<Secret_Key_From_Opinio>'
    },
    // optional : fallback to production if not provided
    test: true
});

function bigBang() {
    var requestData = {
        name: 'mamaji',
        phone: '9999999999',
        address: 'House No.150,Sector-2,HSR Layout',
        email: 'test@test.com',
        latitude: 12.565425,
        longitude: 77.11555
    };

    return deliveryService.registerMerchant(
        // data required to create an order
        requestData,
        // Call back : same signature as the request module callback
        function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log('It all started with a big bang : register your merchant ');
                console.log(body);
                console.log();
                return createRequest();
            }
        }
    );
}

function createRequest() {
    // Sample request data for creating a delivery request
    var requestData = {
        merchant_id: 3,
        amount: 300,
        amount_to_pay: 300,
        phone: '9916263644',
        address: '221B Baker Street',
        locality: 'london',
        callback_url: 'http://www.opinioapp.com'
    };


    return deliveryService.requestDelivery(
        // data required to create an order
        requestData,
        // Call back : same signature as the request module callback
        function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log('This is how we create a request ');
                console.log(body);
                console.log();
                return updateOrder(JSON.parse(body).order_code);
            }
        }
    );
}

function updateOrder(ordercode) {
    // Sample request data for creating a delivery request
    var requestData = {
        order_code: ordercode,
        amount: 300,
        amount_to_pay: 300,
        phone: '9916263677',
        address: '221B Baker Street'
    };

    return deliveryService.updateDelivery(
        // data required to create an order
        requestData,
        // Call back : same signature as the request module callback
        function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sure you can update a request ');
                console.log(body);
                console.log();
                return checkStatus(ordercode);
            }
        }
    );
}

function checkStatus(ordercode) {

    return deliveryService.deliveryStatus(
        // order code for the order that has been created
        ordercode,
        // Call back : same signature as the request module callback
        function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log('Check its status');
                console.log(body);
                console.log();
                return cancelRequest(Number(ordercode));
            }
        }
    );
}

function cancelRequest(ordercode) {
    var form = {
        order_code: ordercode.toString(),
        cancel_reason: 'just for kicks'
    };

    return deliveryService.cancelDelivery(
        // order code for the order that has been created
        form,
        // Call back : same signature as the request module callback
        function (err, response, body) {
            if (err) {
                console.log(err);
            } else {
                console.log('Cancel the delivery');
                console.log(body);
                console.log();
                return allDeliveries();
            }
        }
    );
}

function allDeliveries() {
    return deliveryService.deliveriesAll(null, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('list all deliveries');
            console.log(body);
            console.log();
            someDeliveries();
        }
    });
}

function someDeliveries() {
    return deliveryService.deliveriesAll({
        start_date: '2015-08-01',
        end_date: '2015-10-03'
    }, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('list all deliveries between 2015-08-01 and 2015-10-03');
            console.log(body);
            console.log();
            myDeliveries();
        }
    });
}

function myDeliveries() {
    return deliveryService.deliveriesAll({
        start_date: '2015-08-01',
        end_date: '2015-10-03',
        merchant_id: '3'
    }, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('list all deliveries between 2015-08-01 and 2015-10-03 for merchant id 3 ');
            console.log(body);
            console.log();
            serviceability();
        }
    });
}

function serviceability() {
    var merchant_id = 3;
    return deliveryService.serviceability(merchant_id, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('Serviceability of a particular merchant id 3');
            console.log(body);
            console.log();
            supportedLocalities();
        }
    });
}

function supportedLocalities() {
    var merchant_id = 3;
    return deliveryService.supportedLocalities(merchant_id, function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('list of all supported hubs close to restaurant');
            console.log(body);
            console.log();
        }
    });
}

bigBang();


