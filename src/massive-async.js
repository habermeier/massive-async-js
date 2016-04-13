/// <reference path="../typings/typings.d.ts" />
"use strict";
var massive = require('massive');
var MassiveAsync = (function () {
    function MassiveAsync() {
    }
    MassiveAsync.connectAsync = function (connection) {
        return new Promise(function (resolve, reject) {
            massive.connect(connection, function (err, db) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(db);
                }
            });
        });
    };
    MassiveAsync.sayHello = function (name) {
        console.log('Hello, ' + name);
    };
    return MassiveAsync;
}());
exports.__esModule = true;
exports["default"] = MassiveAsync;
//# sourceMappingURL=massive-async.js.map