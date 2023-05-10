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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const supabaseClient_1 = require("./src/supabase/supabaseClient");
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/', (req, res) => {
    res.send('Default route');
});
// GET /spaces
app.get('/spaces', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaces = yield supabaseClient_1.default.fetchSpaces();
        res.send(spaces);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
}));
// GET /spaces/:id
app.get('/spaces/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const space = yield supabaseClient_1.default.fetchSpaceById(parseInt(req.params.id));
        res.send(space);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
}));
//# sourceMappingURL=index.js.map