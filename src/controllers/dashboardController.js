import db from "../models/db.js";

export const getDashboard = async (req, res) => {
  try {
    const projectCountResult = await db.query("SELECT COUNT(*) FROM projects");
    const organizationCountResult = await db.query("SELECT COUNT(*) FROM organizations");
    const categoryCountResult = await db.query("SELECT COUNT(*) FROM categories");

    const recentProjectsResult = await db.query(`
      SELECT p.id, p.title, p.location, p.date,
             o.name AS organization_name,
             c.name AS category_name
      FROM projects p
      LEFT JOIN organizations o ON p.organization_id = o.id
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.date DESC
      LIMIT 5
    `);

    // OPTIONAL: full projects list (if needed by EJS)
    let projects = [];
    try {
      const allProjectsResult = await db.query(`
        SELECT p.id, p.title, p.location, p.date,
               o.name AS organization_name,
               c.name AS category_name
        FROM projects p
        LEFT JOIN organizations o ON p.organization_id = o.id
        LEFT JOIN categories c ON p.category_id = c.id
      `);

      projects = allProjectsResult.rows || [];
    } catch (err) {
      console.error("Projects query failed:", err);
      projects = [];
    }

    // ✅ CRITICAL FIX: define volunteerProjects (THIS FIXES YOUR ERROR)
    let volunteerProjects = [];

    try {
      const volunteerResult = await db.query(`
        SELECT p.id, p.title, p.location, p.date
        FROM projects p
        INNER JOIN volunteers v ON v.project_id = p.id
        WHERE v.user_id = $1
      `, [req.user?.id]);

      volunteerProjects = volunteerResult.rows || [];
    } catch (err) {
      console.error("Volunteer projects query failed:", err);
      volunteerProjects = [];
    }

    console.log("DEBUG projects length:", projects.length);

    return res.render("dashboard", {
      projectCount: projectCountResult.rows[0].count,
      organizationCount: organizationCountResult.rows[0].count,
      categoryCount: categoryCountResult.rows[0].count,
      recentProjects: recentProjectsResult.rows,

      // FIXED VARIABLES
      projects,
      volunteerProjects
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).send("Server Error loading dashboard");
  }
};