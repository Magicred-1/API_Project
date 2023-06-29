"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv = __importStar(require("dotenv"));
const safe_1 = __importDefault(require("colors/safe"));
dotenv.config();
class SupabaseDB {
    constructor() {
        this.supabaseUrl = process.env.SUPABASE_URL;
        this.supabaseKey = process.env.SUPABASE_KEY;
        if (!this.supabaseUrl || !this.supabaseKey) {
            throw new Error('Supabase URL and key are required');
        }
        // Assign the supabase instance to the supabase property
        this.supabase = (0, supabase_js_1.createClient)(this.supabaseUrl, this.supabaseKey);
        if (!this.supabase) {
            throw new Error('Supabase is not initialized with the correct credentials or the Supabase URL and key are not defined');
        }
        else {
            console.log(safe_1.default.bgGreen('Supabase has been initialized successfully'));
        }
    }
}
const supabaseDB = new SupabaseDB();
exports.default = supabaseDB;
//# sourceMappingURL=supabaseClient.js.map