-- =========================================
-- ORGANIZATIONS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- =========================================
-- PROJECTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE
);

-- =========================================
-- CATEGORIES TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- =========================================
-- MANY-TO-MANY RELATIONSHIP TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- =========================================
-- SAMPLE DATA: ORGANIZATIONS
-- =========================================
INSERT INTO organizations (name, description)
VALUES
('Green Earth Initiative', 'Environmental cleanup and sustainability projects.'),
('Future Scholars', 'Educational support and mentoring programs.'),
('Healthy Communities', 'Health outreach and wellness programs.');

-- =========================================
-- SAMPLE DATA: PROJECTS
-- =========================================
INSERT INTO projects (name, description, organization_id)
VALUES
('Park Cleanup Day', 'Community park cleaning event', 1),
('After-School Tutoring', 'Tutoring for students', 2),
('Community Health Fair', 'Free health services event', 3);

-- =========================================
-- SAMPLE DATA: CATEGORIES (AT LEAST 3 REQUIRED)
-- =========================================
INSERT INTO categories (name)
VALUES
('Environmental'),
('Educational'),
('Health & Wellness'),
('Community Service');

-- =========================================
-- PROJECT ↔ CATEGORY ASSOCIATIONS
-- (Each project has at least one category)
-- =========================================
INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1), -- Park Cleanup → Environmental
(1, 4), -- Park Cleanup → Community Service
(2, 2), -- Tutoring → Educational
(3, 3), -- Health Fair → Health & Wellness
(3, 4); -- Health Fair → Community Service