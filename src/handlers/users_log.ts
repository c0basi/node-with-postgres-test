import express from 'express';
import {users, users_log} from '../models/users_log';

const logs = new users_log();

const create = async (req: express.Request, res: express.Response) =>{
    const user: users =  {
        username: req.body.username,
        password_digest: req.body.password
    }

    const newUser = await logs.create(user)
}

const index = async (req: express.Request, res:express.Response) =>{
    const multipleUsers = await logs.index();

}

const authenticate = async(req: express.Request, res:express.Response) =>{

     const username= req.body.username;
     const password_digest= req.body.password
    

    const new_user = await logs.authenticate(username, password_digest)
    
}

const users_log_routes = (app: express.Application) =>{
    app.get('/users', index),
    app.post('/users', create)
    app.post('/users/authenticate', authenticate)
}

export default users_log_routes;