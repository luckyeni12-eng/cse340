const projects = [
  {
    id: 1,
    title: "Park Cleanup Day",
    image: "/images/park-park-cleanup.jpg",
    description:
      "Join volunteers to clean and restore the local park environment."
  },
  {
    id: 2,
    title: "After-School Tutoring",
    image: "/images/tutoring.jpg",
    description:
      "Help students improve their reading, math, and study skills."
  },
  {
    id: 3,
    title: "Food Bank Assistance",
    image: "/images/food-bank.jpg",
    description:
      "Support food sorting and distribution for families in need."
  },
  {
    id: 4,
    title: "Community Health Fair",
    image: "/images/health-fair.jpg",
    description:
      "Assist in organizing free health checks and awareness programs."
  }
];

/* =========================
   SHOW ALL PROJECTS
========================= */
export const getAllProjects = (req, res) => {
  res.render("projects", {
    title: "Projects",
    projects   // IMPORTANT: send data to EJS
  });
};

/* =========================
   SHOW SINGLE PROJECT
========================= */
export const getProjectById = (req, res) => {
  const id = parseInt(req.params.id);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("project-details", {
    title: project.title,   // IMPORTANT FIX
    project
  });
};