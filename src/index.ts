import express, {Request, Response} from 'express';
import cors from 'cors';
import book_store_routes from './handlers/book_store';

import users_log_routes from './handlers/users_log'


const app: express.Application = express();

const port: number = 3000;
console.log( typeof process.env.user )

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response): void =>{
    res.send('Hello World');
});

users_log_routes(app)


app.listen(port, () =>{
    console.log(`starting app on : ${port}`);
    
    
});

