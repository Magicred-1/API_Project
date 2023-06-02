import express from 'express';
import supabaseDB from './src/utils/supabase/supabaseClient';
import AuthMiddleware from './src/utils/tokenAuthenfication/authMiddleware';
// import { Employee, Space, Ticket, Zoo, Animal } from './src/classes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
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

// POST /spaces/create?name=SpaceName&description=SpaceDescription&capacity=SpaceCapacity&images={..}&type=Type&capacity=20&duration=2 hours + API Key
app.post('/spaces/create/', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate } = req.query;
        let isDisabledAccess = false;
        if(disabledAccess === 'true') {
            isDisabledAccess = true;
        }

        await supabaseDB.createSpace(name as string, description as string, capacity as string, images as string[], type as string, duration as string, openingHours as string[], closingHours as string[], isDisabledAccess as boolean, upcomingMaintenanceDate as string[]);

        res.send(`Space ${name} created successfully`);
    } catch (error) {
        res.status(500).send('An error occurred while creating space');
    }
});

// PUT /spaces/update/:id?name=SpaceName&description=SpaceDescription&capacity=SpaceCapacity&images={..}&type=Type&capacity=20&duration=2 hours + API Key
app.put('/spaces/update/:id', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const spaceID = parseInt(req.params.id);
        const space = await supabaseDB.fetchSpaceById(spaceID);
        
        if (space.length > 0) {
            const { name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate } = req.query;
            let isDisabledAccess = false;
            if(disabledAccess === 'true') {
                isDisabledAccess = true;
            }

            await supabaseDB.updateSpace(spaceID, name as string, description as string, capacity as string, images as string[], type as string, duration as string, openingHours as string[], closingHours as string[], isDisabledAccess as boolean, upcomingMaintenanceDate as string[]);
            res.send(`Space ${name} updated successfully`);
        } else {
            res.status(404).send('No space found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating space');
    }
});

// DELETE /spaces/delete/:id + API Key
app.delete('/spaces/delete/:id', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const spaceID = parseInt(req.params.id);
        const space = await supabaseDB.fetchSpaceById(spaceID);

        if (space.length > 0) {
            await supabaseDB.deleteSpace(spaceID);
            res.send(`Space ${spaceID} deleted successfully`);
        } else {
            res.status(404).send('No space found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while deleting space');
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

// DELETE /employees/delete/:id + API Key
app.delete('/employees/delete/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
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

// DELETE /animals/delete/:id + API Key
app.delete('/animals/delete/:id', AuthMiddleware.checkAPIKey, async (req, res) => {
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

// Tickets
// GET /tickets + API Key return a list of tickets
app.get('/tickets', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const tickets = await supabaseDB.fetchTickets();

        if (tickets.length > 0) {
            res.send(tickets);
        } else {
            res.status(404).send('No tickets found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching tickets');
    }
}


