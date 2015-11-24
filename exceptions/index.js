var fs = require('fs');
var path = require('path');
var currentFile = path.basename(__filename);

fs.readdirSync(__dirname).filter(function (file) {
    return (fs.lstatSync(path.join(__dirname, file)).isFile()) && (file !== currentFile);
}).forEach(function (file) {
    this[path.basename(file, '.js')] = require(path.join(__dirname, file));
});
