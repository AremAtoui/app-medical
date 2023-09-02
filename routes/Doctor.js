const express = require("express");
const Doctor = require("../models/Doctor");


const doctorRouter = express.Router();

//add user
doctorRouter.post("/add", async (req, res) => {
  try {
    let newdoctor = new Doctor(req.body);
    let result = await newdoctor.save();
    res.send({ doctor: result, msg: "doctor is added" });
  } catch (error) {
    console.log(error);
  }
});
//get all doctors
doctorRouter.get("/", async (req, res) => {
  try {

    let result = await Doctor.find();
    res.send({ doctors: result, msg: "all doctors" });
  } catch (error) {
    console.log(error);
  }
});
//delete doctor
doctorRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Doctor.findByIdAndDelete(req.params.id);
    res.send({ msg: "doctor is deleted" });
  } catch (error) {
    console.log(error);
  }
});
// update doctor
doctorRouter.put("/:id", async (req, res) => {
  try {
    let result = await Doctor.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.send({ msg: "doctor is updated" });
  } catch (error) {
    console.log(error);
  }
});


module.exports = doctorRouter;