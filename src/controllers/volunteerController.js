import {
  addVolunteer,
  removeVolunteer,
  getUserVolunteerProjects
} from "../models/volunteers.js";

/* ========================= VOLUNTEER ========================= */
export const volunteerProject = async (req, res) => {
  const userId = req.session.user.id;
  const projectId = req.params.id;

  await addVolunteer(userId, projectId);

  req.flash("success", "You are now volunteering for this project");
  res.redirect(`/projects/${projectId}`);
};

/* ========================= UNVOLUNTEER ========================= */
export const unvolunteerProject = async (req, res) => {
  const userId = req.session.user.id;
  const projectId = req.params.id;

  await removeVolunteer(userId, projectId);

  req.flash("success", "You removed yourself from this project");
  res.redirect(`/projects/${projectId}`);
};

/* ========================= DASHBOARD VOLUNTEERS ========================= */
export const getVolunteerDashboard = async (req, res) => {
  const userId = req.session.user.id;

  const projects = await getUserVolunteerProjects(userId);

  res.render("dashboard", {
    title: "Dashboard",
    user: req.session.user,
    volunteerProjects: projects
  });
};