import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/users.js";

export const loginPage = (req, res) => {
  res.render("login");
};

export const registerPage = (req, res) => {
  res.render("register");
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  await createUser(name, email, hash);

  req.flash("success", "Account created");
  res.redirect("/login");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    req.flash("error", "Invalid credentials");
    return res.redirect("/login");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    req.flash("error", "Invalid credentials");
    return res.redirect("/login");
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role
  };

  res.redirect("/dashboard");
};

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};