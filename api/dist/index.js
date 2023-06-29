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
// import supabaseDB from './src/utils/supabase/supabaseClient';
const authMiddleware_1 = __importDefault(require("./src/utils/tokenAuthenfication/authMiddleware"));
const classes_1 = require("./src/classes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load .env file
const app = (0, express_1.default)();
// JSON parser middleware and API key check as middleware (for all routes)
app.use(express_1.default.json(), authMiddleware_1.default.checkAPIKey);
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Default route');
}));
// Spaces
// GET /spaces + API Key
app.get('/spaces', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaces = classes_1.Space.fetchSpaces();
        res.send(spaces);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
}));
// GET /spaces/:id + API Key
app.get('/spaces/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const space = yield classes_1.Space.fetchSpaceById(parseInt(req.params.id));
        res.send(space);
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
}));
/*
    POST /spaces + body params
    Example :
    {
        "name": "SpaceName",
        "description": "SpaceDescription",
        "capacity": "SpaceCapacity",
        "images": ["https://www.google.com"],
        "type": "Type",
        "duration": "2 hours",
        "openingHours": ["10:00", "11:00"],
        "closingHours": ["18:00", "19:00"],
        "disabledAccess": false,
        "maintenance": false,
        "upcomingMaintenanceDate": ["2021-10-10", "2021-10-11", "2021-10-12"]
    } + API Key as header (x-api-key)
*/
app.post('/spaces', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, maintenance, upcomingMaintenanceDate } = req.body;
        let isDisabledAccess = false;
        let isMaintenance = false;
        if (disabledAccess === 'true') {
            isDisabledAccess = true;
        }
        if (maintenance === 'true') {
            isMaintenance = true;
        }
        const space = new classes_1.Space(name, description, images, type, capacity, duration, openingHours, closingHours, isDisabledAccess, isMaintenance, upcomingMaintenanceDate);
        const { data: createdSpace, error } = yield classes_1.Space.createSpace(space);
        if (createdSpace !== null &&
            ((error === null || error === void 0 ? void 0 : error.code) !== '23505' || (error === null || error === void 0 ? void 0 : error.code) === '1')) {
            res.send(`Space ${name} created successfully`);
        }
    }
    catch (error) {
        res.status(500).send(`An error occurred while creating space`);
    }
}));
/*
    PUT /spaces/update/
    :id?name=SpaceName&description=SpaceDescription&capacity=SpaceCapacity&images={..}&type=Type&capacity=20&duration=2 hours + API Key
*/
app.put('/spaces/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceID = parseInt(req.params.id);
        const space = yield classes_1.Space.fetchSpaceById(spaceID);
        if (space !== null || space !== undefined) {
            const { name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate } = req.query;
            let isDisabledAccess = false;
            if (disabledAccess === 'true') {
                isDisabledAccess = true;
            }
            yield classes_1.Space.updateSpace(spaceID, name, description, capacity, images, type, duration, openingHours, closingHours, isDisabledAccess, upcomingMaintenanceDate);
            res.send(`Space ${name} updated successfully`);
        }
        else {
            res.status(404).send('No space found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while updating space');
    }
}));
// DELETE /spaces/delete/:id + API Key
app.delete('/spaces/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spaceID = parseInt(req.params.id);
        const space = yield classes_1.Space.fetchSpaceById(spaceID);
        if (space !== null) {
            yield classes_1.Space.deleteSpace(spaceID);
            res.send(`Space ${spaceID} deleted successfully`);
        }
        else {
            res.status(404).send('No space found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while deleting space');
    }
}));
// Employees
// GET /employees + API Key return a list of employees
app.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield classes_1.Employee.fetchEmployees();
        if (employees !== null) {
            res.send(employees);
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching employees');
    }
}));
// GET /employees/:id + API Key return a employee object with the id
app.get('/employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = yield classes_1.Employee.fetchEmployeeById(employeeID);
        if (employee !== null) {
            res.send(employee);
        }
        else {
            res.status(404).json({
                message: `No employee found with the id ${employeeID}`
            });
        }
    }
    catch (error) {
        res.status(500).send('An error occurred while fetching the employee');
    }
}));
/* POST /employees/create

Example body params :
{
    "name": "David Moralez",
    "role": "Admin",
    "availabilities": [
        "Friday 8am - 12pm"
    ]
} + API Key as header (x-api-key)

returns a message with the API Key of the employee

*/
app.post('/employees/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, role } = req.body;
        const availabilities = req.body.availabilities;
        const employee = new classes_1.Employee(name, role, availabilities);
        const createdEmployee = yield classes_1.Employee.createEmployee(employee);
        console.log(createdEmployee);
        // const apiKey = await AuthMiddleware.getAPIKeyByEmployeeName(createdEmployee.name);
        // if (employee !== null) {
        //     res.send(`Employee ${employee.name} created successfully with API Key ${apiKey}`);
        // }
    }
    catch (error) {
        res.status(500).send('An error occurred while creating employee');
    }
}));
// DELETE /employees/delete/:id + API Key
app.delete('/employees/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = yield classes_1.Employee.fetchEmployeeById(employeeID);
        if (employee !== null) {
            yield classes_1.Employee.deleteEmployee(employeeID);
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
app.put('/employees/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = yield classes_1.Employee.fetchEmployeeById(employeeID);
        if (employee !== null) {
            const { name, role } = req.query;
            const availabilities = req.query.availabilities;
            yield classes_1.Employee.updateEmployee(employeeID, name, role, availabilities);
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
// // Animals
// // GET /animals + API Key return a list of animals
// app.get('/animals', async (req, res) => {
//     try {
//         const animals = await supabaseDB.fetchAnimals();
//         if (animals.length > 0) {
//             res.send(animals);
//         } else {
//             res.status(404).send('No animals found');
//         }
//     } catch (error) {
//         res.status(500).send('An error occurred while fetching animals');
//     }
// });
// // GET /animals/:id + API Key return a animal object with the id
// app.get('/animals/:id', async (req, res) => {
//     try {
//         const animalID = parseInt(req.params.id);
//         const animal = await supabaseDB.fetchAnimalById(animalID);
//         if (animal.length > 0) {
//             res.send(animal);
//         } else {
//             res.status(404).send('No animal found');
//         }
//     } catch (error) {
//         res.status(500).send('An error occurred while fetching the animal');
//     }
// });
// // POST /animals/create?name=John&species=Cat&age=2&space_id=1 + API Key
// app.post('/animals/create', async (req, res) => {
//     try {
//         const { name, species, age, space_id, treatments } = req.query;
//         await supabaseDB.createAnimal(name as string, species as string, parseInt(age as string), parseInt(space_id as string), treatments as string[]);
//         res.send(`Animal ${name} created successfully`);
//     } catch (error) {
//         res.status(500).send('An error occurred while creating animal');
//     }
// });
// // DELETE /animals/delete/:id + API Key
// app.delete('/animals/delete/:id', async (req, res) => {
//     try {
//         const animalID = parseInt(req.params.id);
//         const animal = await supabaseDB.fetchAnimalById(animalID);
//         if (animal.length > 0) {
//             await supabaseDB.deleteAnimal(animalID);
//             res.send(`Animal ${animal[0].name} deleted successfully`);
//         } else {
//             res.status(404).send('No animal found');
//         }
//     } catch (error) {
//         res.status(500).send('An error occurred while deleting animal');
//     }
// });
// // PUT /animals/update/:id?name=John&species=Cat&age=2&space_id=1 + API Key
// app.put('/animals/update/:id', async (req, res) => {
//     try {
//         const animalID = parseInt(req.params.id);
//         const animal = await supabaseDB.fetchAnimalById(animalID);
//         if (animal.length > 0) {
//             const { name, species, age, space_id } = req.query;
//             await supabaseDB.updateAnimal(animalID, name as string, species as string, parseInt(age as string), parseInt(space_id as string));
//             res.send(`Animal ${name} updated successfully`);
//         } else {
//             res.status(404).send('The animal does not exist please create it first');
//         }
//     } catch (error) {
//         res.status(500).send('An error occurred while updating animal');
//     }
// });
// // Tickets
// // GET /tickets + API Key return a list of tickets
// app.get('/tickets', async (req, res) => {
//     try {
//         const tickets = await supabaseDB.fetchTickets();
//         if (tickets.length > 0) {
//             res.send(tickets);
//         } else {
//             res.status(404).send('No tickets found');
//         }
//     } catch (error) {
//         res.status(500).send('An error occurred while fetching tickets');
//     }
// });
//# sourceMappingURL=index.js.map