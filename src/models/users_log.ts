import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD as string;
const salt = process.env.SALT_ROUNDS as string;
import Client from '../database';

export type users = {
    id?: number;
    username: string;
    password_digest: string;
}


export class users_log{
    async create(u: users): Promise<users>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO users(username, password_digest) VALUES($1, $2) RETURNING *';
            // hashing function
            const hash = bcrypt.hashSync(u.password_digest + pepper, parseInt(salt))


            const result = await conn.query(sql, [u.username, hash]);
            const value = result.rows[0];
            conn.release();
            return value;

        }catch(err){
            throw new Error(`Unable to create user ${u.username}. ${err}`);
            
        }
    }

    async index(): Promise<users[]>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;

        }catch(err){
            throw new Error(`Unable to create user. ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<users| null | undefined>{
        try{
            const conn = await Client.connect();
            const sql = 'SELECT password_digest FROM users where username=($1)'
            const result = await conn.query(sql, [username])

            console.log(password+pepper);
            

            if(result.rows.length){
                const user = result.rows[0];
                console.log(user);
                if(bcrypt.compareSync(password+pepper, user.password_digest)){
                    return user
                }
                
            }
        }catch(err){
            console.log(`${err}`);
            return null
            
            
            
        }

    }
}