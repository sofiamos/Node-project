const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 7,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
  },
  phone: {
      type: String,
      required: true,
      minlength: 10,
  },
  image: {
    type: String,
      required: true,
      minlength: 2,
  },
  bizNum: {
    type: Number,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

});


const Card = mongoose.model("card", cardSchema);
module.exports = Card;
