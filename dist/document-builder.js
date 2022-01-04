"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentBuilder = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const document_base_1 = require("./fixtures/document.base");
class DocumentBuilder {
    constructor() {
        this.logger = new common_1.Logger(DocumentBuilder.name);
        this.document = document_base_1.buildDocumentBase();
    }
    setTitle(title) {
        this.document.info.title = title;
        return this;
    }
    setDescription(description) {
        this.document.info.description = description;
        return this;
    }
    setVersion(version) {
        this.document.info.version = version;
        return this;
    }
    setTermsOfService(termsOfService) {
        this.document.info.termsOfService = termsOfService;
        return this;
    }
    setContact(name, url, email) {
        this.document.info.contact = { name, url, email };
        return this;
    }
    setLicense(name, url) {
        this.document.info.license = { name, url };
        return this;
    }
    addServer(url, description, variables) {
        this.document.servers.push({ url, description, variables });
        return this;
    }
    setExternalDoc(description, url) {
        this.document.externalDocs = { description, url };
        return this;
    }
    setBasePath(path) {
        this.logger.warn('The "setBasePath" method has been deprecated. Now, a global prefix is populated automatically. If you want to ignore it, take a look here: https://docs.nestjs.com/recipes/swagger#global-prefix. Alternatively, you can use "addServer" method to set up multiple different paths.');
        return this;
    }
    addTag(name, description = '', externalDocs) {
        this.document.tags = this.document.tags.concat(lodash_1.pickBy({
            name,
            description,
            externalDocs
        }, lodash_1.negate(lodash_1.isUndefined)));
        return this;
    }
    addSecurity(name, options) {
        this.document.components.securitySchemes = Object.assign(Object.assign({}, (this.document.components.securitySchemes || {})), { [name]: options });
        return this;
    }
    addSecurityRequirements(name, requirements = []) {
        let securityRequirement;
        if (lodash_1.isString(name)) {
            securityRequirement = { [name]: requirements };
        }
        else {
            securityRequirement = name;
        }
        this.document.security = (this.document.security || []).concat(Object.assign({}, securityRequirement));
        return this;
    }
    addBearerAuth(options = {
        type: 'http'
    }, name = 'bearer') {
        this.addSecurity(name, Object.assign({ scheme: 'bearer', bearerFormat: 'JWT' }, options));
        return this;
    }
    addOAuth2(options = {
        type: 'oauth2'
    }, name = 'oauth2') {
        this.addSecurity(name, Object.assign({ type: 'oauth2', flows: {} }, options));
        return this;
    }
    addApiKey(options = {
        type: 'apiKey'
    }, name = 'api_key') {
        this.addSecurity(name, Object.assign({ type: 'apiKey', in: 'header', name }, options));
        return this;
    }
    addBasicAuth(options = {
        type: 'http'
    }, name = 'basic') {
        this.addSecurity(name, Object.assign({ type: 'http', scheme: 'basic' }, options));
        return this;
    }
    addCookieAuth(cookieName = 'connect.sid', options = {
        type: 'apiKey'
    }, securityName = 'cookie') {
        this.addSecurity(securityName, Object.assign({ type: 'apiKey', in: 'cookie', name: cookieName }, options));
        return this;
    }
    build() {
        return this.document;
    }
}
exports.DocumentBuilder = DocumentBuilder;
