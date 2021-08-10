export let books = [
    { title : "The Hunger Games", author : "Suzanne Collins", genre : "Science Fiction", pages : "374", price : "$7.99" },
    { title : "Cinder", author : "Marissa Meyer", genre : "Science Fiction", pages : "390", price : "$10.99" },
    { title : "The Maze Runner", author : "James Dashner", genre : "Science Fiction", pages : "375", price : "$8.99" },
    { title : "Harry Potter and the Chamber of Secrets", author : "J.K. Rowling", genre : "Fantasy", pages : "251", price : "$9.99" },
    { title : "The Fault in Our Stars", author : "John Green", genre : "Romance", pages : "313", price : "$9.99" }
    ];

const getAll = () => {
    return books;
};

const getBook = (title) => {
    return books.find((book) => {
        return book.title === title;
    });
};

export { getAll, getBook };