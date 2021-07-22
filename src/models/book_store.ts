//import { title } from 'process';
import Client from '../database';

export type novel = {
    id?: number;
    title: string;
    total_pages: Number;
    author: string;
    summary: string;

}

export class book_store {
    async index(): Promise<novel[]> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM novel';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch (err){
            throw new Error(`Cannot get novel ${err}`)
        }
    }

    async create(b: novel): Promise<novel> {
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO novel (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [b.title, b.author, b.total_pages, b.summary]);

            const value = result.rows[0];
            conn.release();
            return value;


        }
        catch(err){
            throw new Error(`Could not add ${b.title}. Error: ${err}`)
        }
    }

    async show(id: string): Promise<novel> {
        try{
            const conn = await Client.connect();
            const sql = 'SELECT * FROM novel WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch(err){
            throw new Error(`Could not show novel ${id}. Error ${err}`)
        }
    }

    async delete(id: string): Promise<novel> {
        try{
            const conn = await Client.connect();
            const sql = 'DELETE FROM novel WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const book = result.rows[0];
            conn.release();
            return book;

        }
        catch(err){
            throw new Error(`Could not delete novel ${id}. Error: ${err}`)
        }
    }

}