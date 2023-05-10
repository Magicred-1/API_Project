import * as express from 'express';

import supabaseDB from './src/supabase/supabaseClient';

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Default route');
});

// GET /spaces
app.get('/spaces', async (req: express.Request, res: express.Response) => {
    try {
        const spaces = await supabaseDB.fetchSpaces();

        res.send(spaces);
    } catch (error) {
        res.status(500).send('An error occurred while fetching spaces');
    }
});

// GET /spaces/:id
app.get('/spaces/:id', async (req: express.Request, res: express.Response) => {
    try {
        const space = await supabaseDB.fetchSpaceById(parseInt(req.params.id));

        res.send(space);
    } catch (error) {
        res.status(500).send('An error occurred while fetching space');
    }
});