
import express, { response } from 'express';
import { novel, book_store } from '../models/book_store';


const store = new book_store()

const index = async (_req: express.Request,  res: express.Response) => {
    const novel = await store.index()
    res.json(novel);
}

const create = async(req: express.Request, res: express.Response) => {
    try{
        const book: novel =  {
            title: req.body.title,
            author: req.body.author,
            total_pages: req.body.total_pages,
            summary: req.body.summary
        }
        const created_book = await store.create(book)
        res.json(created_book)
    }catch(err){
        res.json(err)
    }
}


const show = async(req: express.Request, res: express.Response) => {
    const novel = await store.show(req.params.id)
    res.json(novel)
}

const remove = async(req: express.Request, res: express.Response) => {
    const removed = await store.delete(req.params.id)
    res.json(removed)
}

const book_store_routes = (app: express.Application) =>{
    app.get('/products', index);
    app.get('/products/:id', show);
    app.delete('/products/:id', remove);
    app.post('/products', create)
}

export default book_store_routes

