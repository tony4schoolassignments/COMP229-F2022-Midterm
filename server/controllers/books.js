/*
    COMP229-401 Fall 2022
    Midterm Test
    Date: October 28, 2022

    Author: Junesik (Tony) Han
    Student #: 301252900

    Filename: books.js
*/
// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    /*****************
    * ADD CODE HERE *
    *****************/

   // render book add page
     res.render('index', {title: 'Add Book', page: 'books/add', book: {}});
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
    // new book object with properties from form submission
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });
    // create new book object
    booksModel.create(newBook, (err, Book) => {
        if(err){
            console.error(err);
            res.end(err);
        };
        // redirect to book list when its done
        res.redirect('/books/list');
    })
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
    
    // retreive id
    let id = req.params.id;

    // find the book using id
    booksModel.findById(id, (err, book) => {
        // if there is error
        if(err){
            console.error(err);
            res.end(err);
        };
        // else render edit page and show book info
        res.render('index', {title: 'Edit Book', page: 'books/edit', book: book});
    });
};

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/
    
    //retrieve id
    let id = req.params.id;

    // create new book using info from form submission
    let updatedBook = ({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    // find the book by id and update it with new book object
    booksModel.findByIdAndUpdate({_id: id}, updatedBook, (err, Book) => {
        // if there is error
        if(err){
            console.error(err);
            res.end(err);
        };
        // otherwise redirect to book list page
        res.redirect('/books/list');  
    });
};

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/

    // retrieve book id
    let id = req.params.id;
    // remove book using id
    booksModel.remove({_id: id}, (err) => {
        // if there is error
        if(err){
            console.error(err);
            res.end(err);
        };
        // if no error redirect to book list
        res.redirect('/books/list');
    });
};