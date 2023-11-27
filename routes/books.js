const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/*
Routes: /books
Method: GET
Description: Get all books
Access: Public
Parameters: None
*/

router.get("/",(req,res) => {
    res.status(200).json({
        success: true,
        message: "Got all the books",
        data: books
    });
})



/*
Routes: /books/:id
Method: GET
Description: Get books by their Id
Access: Public
Parameters: Id
*/

router.get("/:id",(req,res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not Found "
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Found",
        data: book,
    });
})

/*
Routes: /books/:issued
Method: GET
Description: Get all issued books 
Access: Public
Parameters: none
*/

router.get("/issued/by-user",(req,res) => {
    const userWithIssuedBook = users.filter((each) => {
        if(each.issuedBook) return each;
    });
    const issuedBooks = [];

    userWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
        });
        if(issuedBooks.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Books Issued yet"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users With Issued Book",
            data: issuedBooks,
        });
    });



/*
Routes: /books/:issued
Method: POST
Description: Adding a new book
Access: Public
Parameters: none
Data: id ,name,author, genre , price, publisher
*/

router.post("/", (req,res) => {
    const {data} = req.body;

    if(!data){
        return res.status(400).json({
            success: false,
            message: "No Data to a book"
        });
    }

    const book = books.find((each) => each.id === data.id);
    if(book){
        return res.status(404).json({
            success: false,
            message: "Id already exist"
        })
    }
    const allBooks =  { ...books,data};
    return res.status(201).json({
        success: true,
        message: "Added Book Succesfully",
        data: allBooks,
    })
});


/*
Routes: /books/:id
Method: PuT
Description: Updating book by ID
Access: Public
Parameters: Id
Data: id ,name,author, genre , price, publisher
*/
    
router.put("/updateBook/:id",(req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(400).json({
            success: false,
            message: "Book not found",
        });
    }
    const updateData = books.map((each) => {
        if(each.id === id){
            return {
                ...each,
                ...data
        };
    }
    return each;
    });
    return res.status(200).json({
        success: true,
        message: "Updated a book by their Id",
        data: updateData,
    });
});




module.exports = router;