import express from 'express';
// import supabaseDB from './src/utils/supabase/supabaseClient';
import AuthMiddleware from './src/utils/tokenAuthenfication/authMiddleware';
import { Employee, Space, Ticket, Zoo, Animal } from './src/classes';
import { config } from 'dotenv';


config(); // Load .env file

const app = express();

// JSON parser middleware and API key check as middleware (for all routes)
app.use(express.json(), AuthMiddleware.checkAPIKey);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});

app.get('/', async (req: express.Request, res: express.Response) => {
    res.send('Default route');
});

// Spaces
// GET /spaces + API Key
app.get('/spaces', async (req: express.Request, res: express.Response) => {
    try {
        const spaces = Space.fetchSpaces();

        res.send(spaces);
    } catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
});

// GET /spaces/:id + API Key
app.get('/spaces/:id', async (req: express.Request, res: express.Response) => {
    try {
        const space = await Space.fetchSpaceById(parseInt(req.params.id));

        res.send(space);
    } catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
});

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
app.post('/spaces', async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, maintenance, upcomingMaintenanceDate } = req.body;
        let isDisabledAccess = false;
        let isMaintenance = false;

        if(disabledAccess === 'true') {
            isDisabledAccess = true;
        }

        if(maintenance === 'true') {
            isMaintenance = true;
        }

        const space = new Space(
            name as string,
            description as string,
            images as string[],
            type as string,
            capacity as string,
            duration as string,
            openingHours as string[],
            closingHours as string[],
            isDisabledAccess as boolean,
            isMaintenance as boolean,
            upcomingMaintenanceDate as string[]
        )

        const { data: createdSpace, error } = await Space.createSpace(space);
        
        if (createdSpace !== null &&  
            (error?.code !== '23505' || error?.code === '1')) {
            
            res.send(`Space ${name} created successfully`);
        }

    } catch (error) {
        res.status(500).send(`An error occurred while creating space`);
    }
});

/* 
    PUT /spaces/update/
    :id?name=SpaceName&description=SpaceDescription&capacity=SpaceCapacity&images={..}&type=Type&capacity=20&duration=2 hours + API Key
*/
app.put('/spaces/update/:id', async (req: express.Request, res: express.Response) => {
    try {
        const spaceID = parseInt(req.params.id);
        const space = await Space.fetchSpaceById(spaceID);
        
        if (space !== null || space !== undefined) {
            const { name, description, capacity, images, type, duration, openingHours, closingHours, disabledAccess, upcomingMaintenanceDate } = req.query;
            let isDisabledAccess = false;
            if(disabledAccess === 'true') {
                isDisabledAccess = true;
            }

            await Space.updateSpace(spaceID, name as string, description as string, capacity as string, images as string[], type as string, duration as string, openingHours as string[], closingHours as string[], isDisabledAccess as boolean, upcomingMaintenanceDate as string[]);
            res.send(`Space ${name} updated successfully`);
        } else {
            res.status(404).send('No space found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating space');
    }
});

// DELETE /spaces/delete/:id + API Key
app.delete('/spaces/delete/:id', async (req: express.Request, res: express.Response) => {
    try {
        const spaceID = parseInt(req.params.id);
        const space = await Space.fetchSpaceById(spaceID);

        if (space !== null) {
            await Space.deleteSpace(spaceID);
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
app.get('/employees', async (req: express.Request, res: express.Response) => {
    try {
        const employees = await Employee.fetchEmployees();

        if (employees !== null) {
            res.send(employees);
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching employees');
    }
});

// GET /employees/:id + API Key return a employee object with the id
app.get('/employees/:id', async (req: express.Request, res: express.Response) => {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = await Employee.fetchEmployeeById(employeeID);
        
        if (employee !== null) {
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
app.post('/employees/create', async (req, res) => {
    try {
        const { name, role } = req.body;
        const availabilities = req.body.availabilities as string[];

        const employee = new Employee(
            name as string,
            role as string,
            availabilities as string[]
        );

        const createdEmployee = await Employee.createEmployee(employee);

        console.log(createdEmployee);
    
        // const apiKey = await AuthMiddleware.getAPIKeyByEmployeeName(createdEmployee.name);
        
        // if (employee !== null) {
        //     res.send(`Employee ${employee.name} created successfully with API Key ${apiKey}`);
        // }

    } catch (error) {
        res.status(500).send('An error occurred while creating employee');
    }
});

// DELETE /employees/delete/:id + API Key
app.delete('/employees/delete/:id', async (req, res) => {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = await Employee.fetchEmployeeById(employeeID);

        if (employee !== null) {
            await Employee.deleteEmployee(employeeID);
            res.send(`Employee ${employee[0].name} deleted successfully`);
        } else {
            res.status(404).send('No employee found');
        }
    } catch (error) {
        res.status(500).send('An error occurred while deleting employee');
    }
});

// PUT /employees/update/:id?name=John&role=Manager&availabilities={Monday,Tuesday,Wednesday,Thursday,Friday,Saturday} + API Key
app.put('/employees/update/:id', async (req, res) => {
    try {
        const employeeID = parseInt(req.params.id);
        const employee = await Employee.fetchEmployeeById(employeeID);

        if (employee !== null) {
            const { name, role } = req.query;
            const availabilities = req.query.availabilities as string[];

            await Employee.updateEmployee(employeeID, name as string, role as string, availabilities as string[]);
            res.send(`Employee ${name} updated successfully`);
        } else {
            res.status(404).send('The employee does not exist please create it first');
        }
    } catch (error) {
        res.status(500).send('An error occurred while updating employee');
    }
});

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