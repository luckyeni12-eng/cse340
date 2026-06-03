import { getAllUsers } from "../models/users.js";

export const usersPage = async (req, res) => {
  const users = await getAllUsers();
  res.render("users", { users });
};