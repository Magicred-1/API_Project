import express from 'express';
import supabaseDB from './src/supabase/supabaseClient';
import AuthMiddleware from './src/tokenAuthenfication/authMiddleware';

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', AuthMiddleware.checkAPIKey, (req: express.Request, res: express.Response) => {
    res.send('Default route');
});

// GET /spaces
app.get('/spaces', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const spaces = await supabaseDB.fetchSpaces();

        res.send(spaces);
    } catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
});

// GET /spaces/:id
app.get('/spaces/:id', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const space = await supabaseDB.fetchSpaceById(parseInt(req.params.id));

        res.send(space);
    } catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
});

// POST /spaces
app.post('/spaces', AuthMiddleware.checkAPIKey, async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, capacity } = req.params;

        await supabaseDB.createSpace(name, description, capacity);

        res.send('Space created');
    } catch (error) {
        res.status(500).send('An error occurred while creating space');
    }
});

// POST /employees/create?name=John&role=Manager
app.post('/employees/create', AuthMiddleware.checkAPIKey, async (req, res) => {
    try {
        const { name, role } = req.query;

        await supabaseDB.createEmployee(name as string, role as string);

        res.send('Employee ' + name + ' created');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating employee');
    }
});
