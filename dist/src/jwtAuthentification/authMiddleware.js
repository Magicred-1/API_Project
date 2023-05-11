"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const randomstring_1 = __importDefault(require("randomstring"));
class AuthMiddleware {
    generateAPIKey() {
        const apiKey = randomstring_1.default.generate({
            length: 32,
            charset: 'hex',
        });
        if (!process.env.API_KEY_SECRET) {
            throw new Error('API key secret is not defined');
        }
        const encryptedAPIKey = crypto_js_1.AES.encrypt(apiKey, process.env.API_KEY_SECRET).toString();
        return encryptedAPIKey;
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map