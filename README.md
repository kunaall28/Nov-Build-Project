# Nov-Build-Project

server >>Storing certain  book data
       >>User Register
       >>subscriber

This is a book record management API Server / Backend for the library system or management of records or manuals or books

FINE SYSTEM:
user : 06/03/23 -- 06/06/23
fine for delay -- 
07/06/23 - 50/-
09/06/23 - 3(days) * 50 = 150/-

## subscriptions -- 
3 months(basic)
6 months(standard)
12 months(premium)

If the subscription type is standard && if the subscription date is 06/03/2023 then valid till 06/09/2023 

Within subscription date if user miss the renewal then >> 50-/per day
If subscription date is also missed then 100 + 50/- per day

>> book1
>> basic
>> 06/03/2023 - subscription date
>> 07/03/2023 - borrowed a book from library
>> book1 renewal date is on 21/03/2023
>> 23/03/2023 - fine of 50 = 50-/


>> book2
>> basic
>> 06/03/2023 - subscription date
>> 07/03/2023 - borrowed a book from library
>> book1 renewal date is on 21/03/2023
>> 23/06/2023 - fine of 100(missing the subscription) + 50 = 150/-

missed by renewal date >> 50/-
missed by subscription date >> 100/-
missed by both >> 150/-




## Routes and EndPoints

## /users
POST : Create a new user
GET : To All the Info of User

## /users/{id}
GET: Get a user by passing its ID
PUT: Update a user by their ID
DELETE: Delete the user by its ID(before deleting - check any fine to be paid/ if they still have an issued book)


## /users/subscription-details/{id}
GET: Get User Subscription details
       >>date of subscription
       >>valid till
       >>check fine

## /books
GET: Get all the books
POST: Create/Add new books

## /books/{id}
GET: Get a book by ID
PUT: Update a book by ID

## /books/issued
GET: Get all the issued Books

## /books/issued/withFine
GET: Get All issued books with fine on

## npm init
## npm i nodemon --save-dev