import express from 'express';
import supabaseDB from './src/utils/supabase/supabaseClient';
import AuthMiddleware from './src/utils/tokenAuthenfication/authMiddleware';
// import { Employee, Space, Ticket, Zoo, Animal } from './src/classes';

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', AuthMiddleware.checkAPIKey, (req: express.Request, res: express.Response) => {
    res.send('Default route');
});

// Spaces
// GET /spaces + API Key
app.get('/spaces', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const spaces = await supabaseDB.fetchSpaces();

        res.send(spaces);
    } catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
});

// GET /spaces/:id + API Key
app.get('/spaces/:id', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const space = await supabaseDB.fetchSpaceById(parseInt(req.params.id));

        res.send(space);
    } catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
});

// POST /spaces/create?name=SpaceName&description=SpaceDescription&capacity=SpaceCapacity + API Key
app.post('/spaces/create/', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, capacity } = req.params;

        await supabaseDB.createSpace(name, description, capacity);

        res.send(`Space ${name} created successfully`);
    } catch (error) {
        res.status(500).send('An error occurred while creating space');
    }
});

// Employees
// GET /employees + API Key return a list of employees
app.get('/employees', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const employees = await supabaseDB.fetchEmployees();

        if (employees.length > 0) {
            res.send(employees);
        } else {
            res.status(404).send('No employees found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching employees');
    }
});

// GET /employees/:id + API Key return a employee object with the id
app.get('/employees/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = await supabaseDB.fetchEmployeeById(employeeID);
        
        if (employee.length > 0) {
            res.send(employee);
        } else {
            res.status(404).json({
                message: `No employee found with the id ${employeeID}`
            })
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the employee');
    }
});

// POST /employees/create?name=John&role=Manager&availabilities={Monday,Tuesday,Wednesday,Thursday,Friday,Saturday} + API Key
app.post('/employees/create', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const { name, role } = req.query;
        const availabilities = req.query.availabilities as string[];

        await supabaseDB.createEmployee(name as string, role as string, availabilities);
    
        const apiKey = await AuthMiddleware.getAPIKeyByEmployeeName(name as string);
    
        res.send(`Employee ${name} created successfully, here's the API key for the user: ${apiKey}`);
    } catch (error) {
        res.status(500).send('An error occurred while creating employee');
    }
});

// POST /employees/delete/:id + API Key
app.post('/employees/delete/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = await supabaseDB.fetchEmployeeById(employeeID);

        if (employee.length > 0) {
            await supabaseDB.deleteEmployee(employeeID);
            res.send(`Employee ${employee[0].name} deleted successfully`);
        } else {
            res.status(404).send('No employee found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while deleting employee');
    }
});

// PUT /employees/update/:id?name=John&role=Manager&availabilities={Monday,Tuesday,Wednesday,Thursday,Friday,Saturday} + API Key
app.put('/employees/update/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = await supabaseDB.fetchEmployeeById(employeeID);

        if (employee.length > 0) {
            const { name, role } = req.query;
            const availabilities = req.query.availabilities as string[];

            await supabaseDB.updateEmployee(employeeID, name as string, role as string, availabilities);
            res.send(`Employee ${name} updated successfully`);
        } else {
            res.status(404).send('The employee does not exist please create it first');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating employee');
    }
});

// Animals
// GET /animals + API Key return a list of animals
app.get('/animals', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const animals = await supabaseDB.fetchAnimals();

        if (animals.length > 0) {
            res.send(animals);
        } else {
            res.status(404).send('No animals found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching animals');
    }
});

// GET /animals/:id + API Key return a animal object with the id
app.get('/animals/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const animalID = parseInt(req.params.id);
        const animal = await supabaseDB.fetchAnimalById(animalID);
        
        if (animal.length > 0) {
            res.send(animal);
        } else {
            res.status(404).send('No animal found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the animal');
    }
});

// POST /animals/create?name=John&species=Cat&age=2&space_id=1 + API Key
app.post('/animals/create', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const { name, species, age, space_id, treatments } = req.query;

        await supabaseDB.createAnimal(name as string, species as string, parseInt(age as string), parseInt(space_id as string), treatments as string[]);
    
        res.send(`Animal ${name} created successfully`);
    } catch (error) {
        res.status(500).send('An error occurred while creating animal');
    }
});

// POST /animals/delete/:id + API Key
app.post('/animals/delete/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const animalID = parseInt(req.params.id);
        const animal = await supabaseDB.fetchAnimalById(animalID);

        if (animal.length > 0) {
            await supabaseDB.deleteAnimal(animalID);
            res.send(`Animal ${animal[0].name} deleted successfully`);
        } else {
            res.status(404).send('No animal found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while deleting animal');
    }
});

// PUT /animals/update/:id?name=John&species=Cat&age=2&space_id=1 + API Key
app.put('/animals/update/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const animalID = parseInt(req.params.id);
        const animal = await supabaseDB.fetchAnimalById(animalID);

        if (animal.length > 0) {
            const { name, species, age, space_id } = req.query;

            await supabaseDB.updateAnimal(animalID, name as string, species as string, parseInt(age as string), parseInt(space_id as string));
            res.send(`Animal ${name} updated successfully`);
        } else {
            res.status(404).send('The animal does not exist please create it first');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating animal');
    }
});


