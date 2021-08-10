"use strict"

import express from 'express';
import handlebars from "express-handlebars";
import { Book } from './book.js';
import cors from 'cors';

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies
app.use('/api', cors());

app.engine('hbs', handlebars({defaultLayout: false}));
app.set("view engine", "hbs");

// GET requests
app.get('/', (req,res) => {
    Book.find({}).lean()
        .then((books) => {
            res.render('home', {books: JSON.stringify(books)});
        })
        .catch(err => next(err));
});

// send plain text response
app.get('/about', (req,res) => {
    res.type('text/plain');
    res.send('About page');
   });

app.get('/detail', (req,res,next) => {
    Book.findOne({ title:req.query.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
});
app.post('/detail', (req,res, next) => {
    Book.findOne({ title:req.body.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
});





app.get('/api/books', (req,res) => {
    Book.find({}).lean()
        .then((books) => {
            res.json(books)
        })
        .catch(err => next(err));
});

   app.get('/api/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/book/delete/:id', (req,res, next) => {
    Book.deleteOne({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        console.log(result)
        res.json({"deleted": result});
    });
});

app.post('/api/book/add/', (req,res, next) => {
    console.log(req.body)
    if (!req.body._id) {

        let book = new Book({title:req.body.title,author:req.body.author,genre:req.body.genre,pages:req.body.pages,price:req.body.price});
        book.save((err,newBook) => {
            if (err) return next(err);
            console.log(newBook)
            res.json({updated: 0, _id: newBook._id});
        });
    } else {
        Book.updateOne({ _id: req.body._id}, {title:req.body.title, author: req.body.author, genre: req.body.genre, pages: req.body.pages, price: req.body.price }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/book/add/:title/:author/:genre/:pages/:price', (req,res, next) => {
    let title = req.params.title;
    Book.update({ title: title}, {title:title, author: req.params.author, genre: req.params.genre, pages: req.params.pages, price: req.params.price }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        res.json({updated: result.nModified});
    });
});


app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});