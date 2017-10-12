"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
var data_mapping_1 = require("./data.mapping");
var response_1 = require("./response");
var error_response_1 = require("./error.response");
var RestApiService = (function () {
    function RestApiService() {
        this.mapping = new data_mapping_1.DataMapping();
    }
    RestApiService.prototype.mapSuccessResponse = function (res) {
        var successResponse = new response_1.ResponseModel();
        successResponse.status = res.status;
        successResponse.statusText = res.statusText;
        return successResponse;
    };
    RestApiService.prototype.handleResponseError = function (error) {
        var errorResponse = new error_response_1.ErrorResponse();
        if (error instanceof http_1.Response) {
            errorResponse.status = error.status;
            errorResponse.statusText = error.statusText;
            var body = error.json();
            errorResponse.exception = body.exception;
            errorResponse.message = body.message;
            errorResponse.explanations = body.explanations;
        }
        else {
            errorResponse.status = 0;
            errorResponse.statusText = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errorResponse);
    };
    return RestApiService;
}());
RestApiService = __decorate([
    core_1.Injectable()
], RestApiService);
exports.RestApiService = RestApiService;
