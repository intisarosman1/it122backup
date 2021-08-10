'use strict'

import { Book } from "./book.js";

// find all documents
Book.find({}, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
    return
});

// count # of docs
console.log("step 1")
Book.countDocuments((err, result) => {
    console.log("step 2")
    console.log(result + " db entries");
});
console.log("step 3")