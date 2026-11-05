import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authmiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/", authMiddleware, async (req, res) => {
  const users = await User.find().select("name _id email age");
  res.send({ data: users, error: false, status: 200 });
});

//login
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({
        status: 400,
        data: null,
        error: true,
        errorMsg: "User not exist",
      });

    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(403).send({
        status: 403,
        data: null,
        error: true,
        errorMsg: "Invalid Credentials",
      });

    console.log(process.env.JWTSECRET);
    var token = jwt.sign({ userId: user._id }, process.env.JWTSECRET);

    delete user.password;

    res.status(200).send({
      status: 200,
      data: { user, token },
      error: false,
      errorMsg: null,
    });
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message });
  }
});

//signup
userRoutes.post("/", async (req, res) => {
  const { body } = req;
  try {
    let userInfo = { ...body };

    let hashPassword = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashPassword;
    const user = await User.create(userInfo);

    res.status(201).send({ status: 201, data: user, error: false });
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message });
  }
});

userRoutes.put("/:id", async (req, res) => {
  const { params, body } = req;
  console.log(params, body);
  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true },
    ).exec();
    res.status(200).send({ status: 200, data: user, error: false });
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message });
  }
});

userRoutes.delete("/:id", async (req, res) => {
  const { params } = req;
  try {
    const user = await User.findByIdAndDelete(params.id).exec();
    res.status(200).send({ status: 200, data: null, error: false });
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, data: null, error: true, errorMsg: err.message });
  }
});

export default userRoutes;
