const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { loginRules, registerRules, validation } = require("../middleware/Validator");
const isAuth = require("../middleware/Passport");
// const token = require("../models/Token");
// const sendEmail = require("../utils/SendEmail");
// const crypto = require("crypto");
// router.get("/", (req, res) => {
//     res.send("hello world");
// })

//register
router.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  {
    try {
      const newUser = new User({ name, lastName, email, password });

      // check if the email exist
      const searchedUser = await User.findOne({ email });
      if (searchedUser) {
        return res.status(400).send({ msg: "email already exist" });
      }
      //Hash password
      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const hashedPassword = await bcrypt.hash(password, genSalt);
      console.log(hashedPassword);
      newUser.password = hashedPassword;



      //save the user
      await newUser.save();
      //generate a token
      const payload = {
        _id: newUser._id,
        name: newUser.name,
      }
      const token = await jwt.sign(payload, process.env.secretOrKey, {
        expiresIn: 3600
      });

      res.status(200).send({ newUser, msg: "user is saved", token: `bearer${token}` });
    } catch (error) {

      // res.status(500).send("can not  save the user");
      console.log(error)
      res.status(500).send({ msg: "can not  save the user" });
    }
  }
});

//login
router.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body
  try {
    //find if the user exist
    const searchedUser = await User.findOne({ email });
    //find if the email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "Bad credential" });
    }
    //if password are equal
    const match = await bcrypt.compare(password, searchedUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Bad credential" });
    }
    //creer un token
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };

    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    //console.log(token)
    //send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ msg: "Can not get the user" });
  }
});
// const token = await new Token({
//   userld: User._id,
//   token: crypto.randomBytes(32).toString("hex")
// }).save();
// const url = `$ {process.env.BASE_URL}users/${User._id}/verify/{token.token}`;
// await sendEmail(User.email, "Verify Email", url)

router.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
})

router.get("/", async (req, res) => {
  try {
    let result = await User.find();
    res.send({ users: result, msg: "get all users" })
  } catch (error) {
    console.log(error)
  }

})

//delete user
router.delete("/:id", async (req, res) => {
  try {
    let result = await User.findByIdAndDelete(req.params.id);
    res.send({ msg: "user is deleted" });
  } catch (error) {
    console.log(error);
  }
});
// update user
router.put("/:id", async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ msg: "user is updated" });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/:id/verify//token", async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     if (!User)
//       return res.status(400).send({ msg: "invalid link" });
//     const token = await Token.findOne(
//       {
//         userld: User._id,
//         token: req.params.token
//       }
//     );
//     if (!token)
//       return res.status(400).send({ msg: "invalid link" });

//     await User.updateOne(_id:User_id, verified: true)
//     await token.remove()
//     res.status(200).send({ msg: "email verified successful" });
//   } catch (error) {
//     res.status(500).send({ msg: "email NOT verified " });
//   }
// })

module.exports = router;