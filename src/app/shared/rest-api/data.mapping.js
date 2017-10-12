"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataMapping = (function () {
    function DataMapping() {
    }
    DataMapping.prototype.mapResponseArray = function (res) {
        var dataArray = res.json();
        return dataArray || [];
    };
    DataMapping.prototype.mapResponse = function (res) {
        var dataObject = res.json();
        return dataObject || {};
    };
    return DataMapping;
}());
exports.DataMapping = DataMapping;
