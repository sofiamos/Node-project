const express = require("express");
const joi = require("joi");
const _ = require("lodash");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const User = require("../models/User");
const router = express.Router();

const cardSchema = joi.object({
    name: joi.string().required().min(2),
    description: joi.string().required().min(2).max(255),
    address: joi.string().required().min(2),
    image: joi.string().required().min(2),
    phone: joi.string().required().min(10),
  });
 //Created new user card
router.post("/", auth, async (req, res) => {
    try {
      //check if user biz
      if (!req.payload.biz)
      return res.status(400).send("Only biz user can add cards");
      // joi validation
      const { error } = cardSchema.validate(req.body);
      if (error) return res.status(400).send(error.message);

  
     // create random bizNum
     let bizFlag = true;

     while (bizFlag) {
       var randomBiznum = _.random(1, 9999);
       let checkCard = await Card.findOne ({bizNum: randomBiznum});
       if (!checkCard) bizFlag = false
     };

      // add new card
      let card = new Card(req.body);
      card.bizNum = randomBiznum;
      card.userId = req.payload._id;
      await card.save();

      res.status(201).send("Card was added successfuly to the system" + card);
    } catch (error) {
     res.status(400).send("Error in the card" + error);
    }
    });
     
  
 
   //get all cards for userID
   router.get("/MyCards", auth, async (req, res) => {
    try {
      let cards = await Card.find({ userId: req.payload._id });
      if (!cards) return res.status(404).send("No such cards for user");
      res.status(200).send(cards);
    } catch (error) {
      return res.status(400).send("" + error);
    }
  });



  // get users card by id
  router.get("/:id", auth, async (req, res) => {
  try {
   // search for user's card by id
  let card = await Card.findById(req.params.id);
  if (!card) return res.status(404).send("No such card for user");
  res.status(200).send(card);
  } catch (error) {
  res.status(400).send(error)
  }
  }); 

  // get all cards
router.get("/", auth, async (req, res) => {
  try {
    let card = await Card.find();
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
  





  
  

  module.exports = router;
