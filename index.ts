import * as express from 'express';
import supabaseDB from './src/supabase/supabaseClient';

console.log(supabaseDB.fetchUsers());

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(supabaseDB.fetchUsers());
});

app.get('/ping', (req: express.Request, res: express.Response) => {
    res.send('pong');
    console.log(req.query); // { name: 'Adrien' } url : /ping?name=Adrien
});

app.get('/school', (req: express.Request, res: express.Response) => {
    res.send('PD VA !');
});

app.get('/school/:name/:id', (req: express.Request, res: express.Response) => {
    const name = req.params.name;
    const id = req.params.id;
    // { name: 'Adrien' } url : /school/name=Adrien/id=1

    res.send(`Bonjour ${name.toUpperCase()} ! Tu es dans la classe n° ${id}`);
});