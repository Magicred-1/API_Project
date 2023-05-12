import express from 'express';
import supabaseDB from './src/utils/supabase/supabaseClient';
import authMiddleware from './src/utils/tokenAuthenfication/authMiddleware';
import AuthMiddleware from './src/utils/tokenAuthenfication/authMiddleware';

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', AuthMiddleware.checkAPIKey, (req: express.Request, res: express.Response) => {
    res.send('Default route');
});

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

// POST /spaces + API Key
app.post('/spaces', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, capacity } = req.params;

        await supabaseDB.createSpace(name, description, capacity);

        res.send('Space created');
    } catch (error) {
        res.status(500).send('An error occurred while creating space');
    }
});

// GET /employees + API Key
app.get('/employees', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const employees = await supabaseDB.fetchEmployees();

        res.send(employees);
    } catch (error) {
        res.status(500).send('An error occurred while fetching employees');
    }
});

// POST /employees/create?name=John&role=Manager&availabilities={Monday,Tuesday} + API Key
app.post('/employees/create', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const { name, role } = req.query;
        const availabilities = req.query.availabilities as string[];

        await supabaseDB.createEmployee(name as string, role as string, availabilities);
    
        const apiKey = await authMiddleware.getAPIKeyByEmployeeName(name as string);
    
        res.send(`Employee ${name} created successfully, here's the API key for the user: ${apiKey}`);
    } catch (error) {
        res.status(500).send('An error occurred while creating employee');
    }
});

