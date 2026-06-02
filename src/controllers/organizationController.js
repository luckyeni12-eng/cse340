import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId,
  createOrganization,
  updateOrganization,
  deleteOrganization
} from "../models/organizations.js";

/* ========================= LIST ========================= */
export const organizationsPage = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations
    });
  } catch (err) {
    next(err);
  }
};

/* ========================= DETAILS ========================= */
export const organizationDetailsPage = async (req, res, next) => {
  try {
    const organization = await getOrganizationById(req.params.id);
    const projects = await getProjectsByOrganizationId(req.params.id);

    if (!organization) {
      return res.status(404).send("Organization not found");
    }

    res.render("organizations/organization-details", {
      title: organization.name,
      organization,
      projects
    });
  } catch (err) {
    next(err);
  }
};

/* ========================= CREATE PAGE ========================= */
export const newOrganizationPage = (req, res) => {
  res.render("organizations/new-organization", {
    title: "Add Organization"
  });
};

/* ========================= CREATE HANDLER ========================= */
export const createOrganizationHandler = async (req, res, next) => {
  try {
    const { name, description, contact_email } = req.body;

    if (!name || !contact_email) {
      return res.status(400).send("Name and email are required");
    }

    await createOrganization(name, description, contact_email);

    if (req.flash) {
      req.flash("success", "Organization created successfully");
    }

    res.redirect("/organizations");
  } catch (err) {
    next(err);
  }
};

/* ========================= EDIT PAGE ========================= */
export const editOrganizationPage = async (req, res, next) => {
  try {
    const org = await getOrganizationById(req.params.id);

    if (!org) {
      return res.status(404).send("Not found");
    }

    res.render("organizations/edit-organization", {
      title: "Edit Organization",
      org
    });
  } catch (err) {
    next(err);
  }
};

/* ========================= UPDATE ========================= */
export const updateOrganizationHandler = async (req, res, next) => {
  try {
    const { name, description, contact_email } = req.body;

    await updateOrganization(req.params.id, name, description, contact_email);

    if (req.flash) {
      req.flash("success", "Organization updated successfully");
    }

    res.redirect("/organizations");
  } catch (err) {
    next(err);
  }
};

/* ========================= DELETE ========================= */
export const deleteOrganizationHandler = async (req, res, next) => {
  try {
    await deleteOrganization(req.params.id);

    if (req.flash) {
      req.flash("success", "Organization deleted successfully");
    }

    res.redirect("/organizations");
  } catch (err) {
    next(err);
  }
};