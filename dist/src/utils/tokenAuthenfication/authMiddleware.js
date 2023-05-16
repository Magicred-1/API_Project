"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const supabaseClient_1 = __importDefault(require("../supabase/supabaseClient"));
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
    checkAPIKey(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = req.headers['x-api-key'];
            if (!apiKey) {
                res.status(401).json({
                    message: 'API key is missing',
                });
            }
            else {
                const { data: apiKeyData, error } = yield supabaseClient_1.default.supabase
                    .from('employees')
                    .select('*')
                    .eq('api_key', apiKey);
                if (error) {
                    res.status(500).json({
                        message: 'Internal server error',
                    });
                }
                else if (apiKeyData.length === 0) {
                    res.status(401).json({
                        message: 'API key cannot be found',
                    });
                }
                else {
                    return next();
                }
            }
        });
    }
    getAPIKeyByEmployeeName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: employees, error } = yield supabaseClient_1.default.supabase
                    .from('employees')
                    .select('api_key')
                    .eq('name', name)
                    .single();
                if (error) {
                    console.error(error);
                    return Promise.reject(error);
                }
                else {
                    return Promise.resolve(employees.api_key);
                }
            }
            catch (error) {
                console.error(error);
                return Promise.reject(error);
            }
        });
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map