import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganizationId,
} from "../models/organizations.js";

export const organizationsPage = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const organizationDetailsPage = async (req, res) => {
  try {
    const organizationId = req.params.id;

    const organization = await getOrganizationById(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);

    if (!organization) {
      return res.status(404).send("Organization not found");
    }

    res.render("organization-details", {
      title: organization.name,
      organization,
      projects,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};