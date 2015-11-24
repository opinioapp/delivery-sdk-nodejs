var Joi = require('joi');

module.exports = {
    authHeaderTemplate: 'Opinio @#SIGNATURE',
    bed: {
        test: 'http://staging.deliver.opinioapp.com',
        prod: 'http://deliver.opinioapp.com'
    },
    methods: {
        requestDelivery: {
            httpVerb: 'POST',
            resource: '/api/v1/orders',
            schema: Joi.object().keys({
                merchant_id: Joi.number().min(0).required(),
                amount: Joi.number().min(0).required(),
                amount_to_pay: Joi.number().min(0).required(),
                phone: Joi.string().required(),
                address: Joi.string().required(),
                locality: Joi.string().required(),
                order_code: Joi.string(),
                callback_url: Joi.string(),
                latitude: Joi.number(),
                longitude: Joi.number(),
                merchant_phone: Joi.string()
            })
        },
        updateDelivery: {
            httpVerb: 'PUT',
            resource: '/api/v1/orders',
            schema: Joi.object().keys({
                order_code: Joi.string().required(),
                amount: Joi.number().min(0).required(),
                amount_to_pay: Joi.number().min(0).required(),
                phone: Joi.string(),
                address: Joi.string()
            })
        },
        cancelDelivery: {
            httpVerb: 'PUT',
            resource: '/api/v1/orders',
            schema: Joi.object().keys({
                order_code: Joi.string().required(),
                cancel_reason: Joi.string()
            })
        },
        deliveryStatus: {
            httpVerb: 'GET',
            resource: '/api/v1/orders'
        },
        deliveriesAll: {
            httpVerb: 'GET',
            resource: '/api/v1/orders',
            schema: Joi.object().keys({
                start_date: Joi.date().format('YYYY-MM-DD').required().raw(),
                end_date: Joi.date().format('YYYY-MM-DD').required().raw(),
                merchant_id: Joi.string()
            })
        },
        registerMerchant: {
            httpVerb: 'POST',
            resource: '/api/v1/merchants',
            schema: Joi.object().keys({
                name: Joi.string().min(1).required(),
                phone: Joi.string().min(10).required(),
                address: Joi.string().min(1).required(),
                email: Joi.string().email().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                app_merchant_id: Joi.string().min(1)
            })
        },
        serviceability: {
            httpVerb: 'GET',
            resource: '/api/v1/serviceability'
        },
        supportedLocalities: {
            httpVerb: 'GET',
            resource: '/api/v1/localities'
        }
    },
    signatureVersion: 1,
    signingAlgorithm: 'sha1',
    signatureMethod: 'HmacSHA1'
};