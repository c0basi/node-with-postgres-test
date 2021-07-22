import dotenv from 'dotenv'
import {Pool} from 'pg'


dotenv.config();

const {
    POSTGRES_HOST,
    Database,
    Username,
    password
} = process.env


const client = new Pool({
    host: POSTGRES_HOST,
    database: Database,
    user: Username,
    password: password
});


export default client;