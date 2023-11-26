const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running",
    data: "heyy",
  });
});

/*
Routes: /users
Method: GET
Description: Get all users
Access: Public
Parameters: None
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
Routes: /users/:id
Method: GET
Description: Get single user info by their ID
Access: Public
Parameters: Id
*/

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist!!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Exist",
    data: user,
  });
});

/*
Routes: /users/
Method: POST
Description: Creating new user
Access: Public
Parameters: none
*/

app.post("/users", (req, res) => {
    const { id, name, surname, email,subscriptionType, subscriptionDate } = req.body

    const user = users.find((each) => each.id === id);

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User With the Id Exists",
      });
    }
    users.push({
      id,
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
    });

    return res.status(201).json({
      success: true,
      message: "User Added",
      data: users,
    })
});


/*
Routes: /users/:id
Method: PUT
Description: Updating User by their ID
Access: Public
Parameters: Id
*/

app.put("/users/:id", (req,res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exists",
    });
  }
  const updateUserData = users.map((each) => {
    if(each.id === id){
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated!!",
    data: updateUserData,
  });
});



/*
Routes: /users/:id
Method: DELETE
Description: Deleting User by their ID
Access: Public
Parameters: Id
*/


app.delete("/users/:id",(req,res) => {
  const {id} = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exists",
    });
  }

  
})


app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exists",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
