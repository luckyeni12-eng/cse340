-- =========================================
-- COMMUNITY SERVICE PORTAL DATABASE SETUP
-- =========================================

-- =========================================
-- ORGANIZATIONS TABLEs
-- =========================================
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- =========================================
-- PROJECTS TABLEs
-- =========================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    organization_id INT REFERENCES organizations(id) ON DELETE CASCADE
);

-- =========================================
-- CATEGORIES TABLE
-- Added:
-- 1. description column
-- 2. image column
-- =========================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

-- =========================================
-- PROJECT-CATEGORIES JUNCTION TABLE
-- MANY-TO-MANY RELATIONSHIP
-- =========================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- =========================================
-- SAMPLE ORGANIZATIONS
-- =========================================
INSERT INTO organizations (name, description)
VALUES
('Green Earth Initiative', 'Environmental cleanup projects'),
('Future Scholars', 'Education and tutoring programs'),
('Healthy Communities', 'Health outreach and wellness programs');

-- =========================================
-- SAMPLE PROJECTS
-- =========================================
INSERT INTO projects (name, description, organization_id)
VALUES
('Park Cleanup', 'Clean and restore local parks and public spaces', 1),
('Tutoring Program', 'Help students improve academically through mentoring', 2),
('Health Fair', 'Provide free community health services and awareness', 3);

-- =========================================
-- SAMPLE CATEGORIES
-- =========================================
INSERT INTO categories (name)
VALUES
('Educational'),
('Community Services'),
('Environmental'),
('Health & Wellness');

-- =========================================
-- PROJECT-CATEGORY RELATIONSHIPS
-- =========================================
INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 3),
(1, 2),
(2, 1),
(3, 4),
(3, 2);

-- =========================================
-- VOLUNTEERS (W06 MANY-TO-MANY)
-- =========================================
CREATE TABLE IF NOT EXISTS volunteers (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, project_id)
);