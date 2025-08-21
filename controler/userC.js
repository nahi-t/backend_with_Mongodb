const { user: User, validatuser ,validatuserlogin} = require("../models/userM");
const config = require("config");
const jwt=require("jsonwebtoken");
const _= require("lodash");
const bcrypt = require("bcrypt");

async function reg(req, res) {
  const { error } = validatuser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(400).send("User already exists");

  const user = new User(_.pick(req.body, ["name", "email", "password","isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  await user.save();
  const token=jwt.sign({_id: user._id, name: user.name, isAdmin: user.isAdmin  }, config.get("jwtPrivateKey") );
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email", "isAdmin"]));

}

async function login(req, res) {
  const { error } = validatuserlogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Invalid email or passwor");
  const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
//     const user = new User(_.pick(req.existingUser, ["name", "email", "password"]));
//   res.json(_.pick(user, [ "name","email"]));
const token=jwt.sign({_id: existingUser._id, name: existingUser.name, isAdmin: existingUser.isAdmin}, config.get("jwtPrivateKey"));

  // Optionally, you can return the token in the response body as well
  //
  res.json({ token });
}
async function Cuser (req,res) {
const user=await User.findById(req.user._id).select('-password') 
res.send(user)

}

module.exports = { reg, login ,Cuser};
