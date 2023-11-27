const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router();


/*
Routes: /
Method: GET
Description: Get all users
Access: Public
Parameters: None
*/

router.get("/", (req, res) => {
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
  
  router.get("/:id", (req, res) => {
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
  Routes: /
  Method: POST
  Description: Creating new user
  Access: Public
  Parameters: none
  */
  
  router.post("/", (req, res) => {
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
  Routes: /:id
  Method: PUT
  Description: Updating User by their ID
  Access: Public
  Parameters: Id
  */
  
  router.put("/:id", (req,res) => {
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
  Routes: /:id
  Method: DELETE
  Description: Deleting User by their ID
  Access: Public
  Parameters: Id
  */
  
  
  router.delete("/:id",(req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exists",
      });
    }
    const index = users.indexOf(user);
    users.splice(index,1)
    
    return res.status(200).json({
      success: true,
      message:"Deleted User",
      data: users
    })
  })


  /*
  Routes: /users/subscription-details/:id
  Method: GET
  Description: Get all user subscription details by their ID
  Access: Public
  Parameters: Id
  */

router.get("/subscription-details/:id", (req,res) => {
  const {id} = req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "User with The Id doesn't exist"
    });
  }

  const getDateInDays = (data ="") => {
    let date;
    if(data === ""){
      date =new Date();
    }else{
      date = new Date(data);
    }
    let days = Math.floor(data / (1000*60*60*24));
    return days;
  };


  const subscriptionType = (data) => {
    if((user.subscriptionType = "Basic")){
      date = date + 90;
    }else if((user.subscriptionType = "Standard")){
      date = date + 180;
    }else if((user.subscriptionType = "Premium")){
      date = date + 3600;
    }
    return date;
  };
})


  module.exports = router;