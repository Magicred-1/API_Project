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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get('/', authMiddleware_1.default.checkAPIKey, (req, res) => {
    res.send('Default route');
});
// Spaces
// GET /spaces + API Key
app.get('/spaces', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaces = yield supabaseClient_1.default.fetchSpaces();
        res.send(spaces);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
}));
// GET /spaces/:id + API Key
app.get('/spaces/:id', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const space = yield supabaseClient_1.default.fetchSpaceById(parseInt(req.params.id));
        res.send(space);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
}));
// POST /spaces + API Key
app.post('/spaces/create/', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, capacity } = req.params;
        yield supabaseClient_1.default.createSpace(name, description, capacity);
        res.send(`Space ${name} created successfully`);
    }
    catch (error) {
        res.status(500).send('An error occurred while creating space');
    }
}));
// Employees
// GET /employees + API Key return a list of employees
app.get('/employees', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield supabaseClient_1.default.fetchEmployees();
        if (employees.length > 0) {
            res.send(employees);
        }
        else {
            res.status(404).send('No employees found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching employees');
    }
}));
// GET /employees/:id + API Key return a employee object with the id
app.get('/employees/:id', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = yield supabaseClient_1.default.fetchEmployeeById(employeeID);
        if (employee.length > 0) {
            res.send(employee);
        }
        else {
            res.status(404).send('No employee found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching the employee');
    }
}));
// POST /employees/create?name=John&role=Manager&availabilities={Monday,Tuesday,Wednesday,Thursday,Friday,Saturday} + API Key
app.post('/employees/create', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// POST /employees/delete/:id + API Key
app.post('/employees/delete/:id', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = yield supabaseClient_1.default.fetchEmployeeById(employeeID);
        if (employee.length > 0) {
            yield supabaseClient_1.default.deleteEmployee(employeeID);
            res.send(`Employee ${employee[0].name} deleted successfully`);
        }
        else {
            res.status(404).send('No employee found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while deleting employee');
    }
}));
// PUT /employees/update/:id?name=John&role=Manager&availabilities={Monday,Tuesday,Wednesday,Thursday,Friday,Saturday} + API Key
app.put('/employees/update/:id', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = yield supabaseClient_1.default.fetchEmployeeById(employeeID);
        if (employee.length > 0) {
            const { name, role } = req.query;
            const availabilities = req.query.availabilities;
            yield supabaseClient_1.default.updateEmployee(employeeID, name, role, availabilities);
            res.send(`Employee ${name} updated successfully`);
        }
        else {
            res.status(404).send('The employee does not exist please create it first');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while updating employee');
    }
}));
// Animals
// GET /animals + API Key return a list of animals
app.get('/animals', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield supabaseClient_1.default.fetchAnimals();
        if (animals.length > 0) {
            res.send(animals);
        }
        else {
            res.status(404).send('No animals found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching animals');
    }
}));
// GET /animals/:id + API Key return a animal object with the id
app.get('/animals/:id', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animalID = parseInt(req.params.id);
        const animal = yield supabaseClient_1.default.fetchAnimalById(animalID);
        if (animal.length > 0) {
            res.send(animal);
        }
        else {
            res.status(404).send('No animal found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching the animal');
    }
}));
// POST /animals/create?name=John&species=Cat&age=2&space_id=1 + API Key
app.post('/animals/create', authMiddleware_1.default.checkAPIKey, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, species, age, space_id } = req.query;
        yield supabaseClient_1.default.createAnimal(name, species, parseInt(age), parseInt(space_id));
        res.send(`Animal ${name} created successfully`);
    }
    catch (error) {
        res.status(500).send('An error occurred while creating animal');
    }
}));
//# sourceMappingURL=index.js.map