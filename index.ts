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

app.post('/create', async (req: express.Request, res: express.Response) => {
    try {
        const user = req.query.name as string;

        await supabaseDB.createUser(user);

        res.send('User created ' + user + ' successfully');
    } catch (error) {
        res.status(500).send('An error occurred while creating the user');
    }
});

app.get('/read', async (req: express.Request, res: express.Response) => {
    try {
        const result = await supabaseDB.fetchUsers();

        res.send(result);
    } catch (error) {
        res.status(500).send('An error occurred while fetching the users');
    }
});

app.post('/update', async (req: express.Request, res: express.Response) => {
    try {
        const userID = parseInt(req.query.id as string);
        const name = req.query.name as string;

        await supabaseDB.updateUser(userID, name);

        res.send('User N°' +  userID + 'got his name updated to ' + name + ' successfully');
    } catch (error) {
        res.status(500).send('An error occurred while updating the user');
    }
});