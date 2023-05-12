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
const express_1 = __importDefault(require("express"));
const supabaseClient_1 = __importDefault(require("./src/utils/supabase/supabaseClient"));
const authMiddleware_1 = __importDefault(require("./src/utils/tokenAuthenfication/authMiddleware"));
const authMiddleware_2 = __importDefault(require("./src/utils/tokenAuthenfication/authMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/', authMiddleware_2.default.checkAPIKey, (req, res) => {
    res.send('Default route');
});
// GET /spaces + API Key
app.get('/spaces', authMiddleware_2.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaces = yield supabaseClient_1.default.fetchSpaces();
        res.send(spaces);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
}));
// GET /spaces/:id + API Key
app.get('/spaces/:id', authMiddleware_2.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const space = yield supabaseClient_1.default.fetchSpaceById(parseInt(req.params.id));
        res.send(space);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
}));
// POST /spaces + API Key
app.post('/spaces', authMiddleware_2.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, capacity } = req.params;
        yield supabaseClient_1.default.createSpace(name, description, capacity);
        res.send('Space created');
    }
    catch (error) {
        res.status(500).send('An error occurred while creating space');
    }
}));
// GET /employees + API Key
app.get('/employees', authMiddleware_2.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield supabaseClient_1.default.fetchEmployees();
        res.send(employees);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching employees');
    }
}));
// POST /employees/create?name=John&role=Manager&availabilities={Monday,Tuesday} + API Key
app.post('/employees/create', authMiddleware_2.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, role } = req.query;
        const availabilities = req.query.availabilities;
        yield supabaseClient_1.default.createEmployee(name, role, availabilities);
        const apiKey = yield authMiddleware_1.default.getAPIKeyByEmployeeName(name);
        res.send(`Employee ${name} created successfully, here's the API key for the user: ${apiKey}`);
    }
    catch (error) {
        res.status(500).send('An error occurred while creating employee');
    }
}));
//# sourceMappingURL=index.js.map