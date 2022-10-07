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

 // update card user
router.put("/:id", auth, async (req, res) => {
    try {

      //check if user biz=true 
      if (!req.payload.biz)
      return res.status(400).send("Only biz user can update cards");

       // joi validation:
          const { error } = cardSchema.validate(req.body);
          if (error) return res.status(400).send("" + error);
  
       // search if card exists
          let card = await Card.findOne({cardSchema: req.params._Id});
          if (!card) return res.status(400).send("card not found");
  
      // update biz card
          card = await Card.updateOne(
              { _Id: req.params._Id },
              req.body,
              {new: true}
              );
          res.status(200).send(card);
    } catch (error) {
       res.status(400).send("" + error);
    }
  });




  router.delete("/:id", auth, async (req, res) => {
    try {
      // check if the user is admin - biz=true
      if (!req.payload.biz)
      return res.status(400).send("Only biz user can delete cards");
      let card= await Card.findByIdAndRemove(req.params.id);
      if (!card) return res.status(404).send("Not biz user");
      res.status(200).send("Card removed successfully!");
    } catch (error) {
      res.status(400).send(error);
    }
  });




module.exports = router;
