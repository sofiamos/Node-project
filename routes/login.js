const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/auth");

const loginSchema = joi.object({
  email: joi.string().required().email().min(6),
  password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
  try {
    // joi validation
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // check exist user
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("wrong password or email");

    // check password
    const compareResult = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!compareResult) return res.status(400).send("wrong password or email");

    // create token
    const genToken = jwt.sign(
      { _id: user._id, biz: user.biz},
      process.env.jwtKey
    );

    res.status(200).send({ token: genToken });
  } catch (error) {
    res.status(400).send("ERROR in login" + error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
  let user = await User.findOne({ email: req.body.email });
  if(!user) return res.status(404).send("User does not exist");
  res.status(200).send(user);
  } catch (err) {
      res.status(400).send("Error in get login");
  }
});

module.exports = router;
