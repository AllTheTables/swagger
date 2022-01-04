"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiSchemaDecorator = exports.ApiSchema = void 0;
const constants_1 = require("../constants");
const helpers_1 = require("./helpers");
function ApiSchema(options) {
    return createApiSchemaDecorator(options);
}
exports.ApiSchema = ApiSchema;
function createApiSchemaDecorator(options) {
    return helpers_1.createClassDecorator(constants_1.DECORATORS.API_SCHEMA, [options]);
}
exports.createApiSchemaDecorator = createApiSchemaDecorator;
