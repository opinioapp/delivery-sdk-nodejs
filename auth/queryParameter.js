var queryParameter = {
    normalize: function (keyValuePairs) {
        if (!keyValuePairs) {
            return '';
        } else {
            var keyArray = Object.keys(keyValuePairs);
            if (keyArray.length === 0) {
                return '';
            } else {
                var sortedKeyValuePairArray = keyArray.sort().map(function (key) {
                    return fixedEncodeURIComponent(key) + '=' + fixedEncodeURIComponent(keyValuePairs[key]);
                });
                return '&' + sortedKeyValuePairArray.join('&');
            }
        }
    }
};

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

module.exports = queryParameter;