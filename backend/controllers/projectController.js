const db = require("../config/db");

const projectSelectFields =
  "id, title, description, tech, link, image_url AS imageUrl";

const getProjects = async (req, res) => {
  try {
    const [projects] = await db.query(
      `SELECT ${projectSelectFields} FROM projects ORDER BY id DESC`
    );

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Could not load projects.",
    });
  }
};

const createProject = async (req, res) => {
  const { title, description, tech, link, imageUrl } = req.body;

  if (!title || !description || !tech) {
    return res.status(400).json({
      message: "Title, description, and technologies are required.",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO projects (title, description, tech, link, image_url) VALUES (?, ?, ?, ?, ?)",
      [title, description, tech, link || "#", imageUrl || null]
    );

    const [rows] = await db.query(
      `SELECT ${projectSelectFields} FROM projects WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not create project.",
    });
  }
};

const updateProject = async (req, res) => {
  const projectId = Number(req.params.id);
  const { title, description, tech, link, imageUrl } = req.body;

  if (!title || !description || !tech) {
    return res.status(400).json({
      message: "Title, description, and technologies are required.",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE projects SET title = ?, description = ?, tech = ?, link = ?, image_url = ? WHERE id = ?",
      [title, description, tech, link || "#", imageUrl || null, projectId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    const [rows] = await db.query(
      `SELECT ${projectSelectFields} FROM projects WHERE id = ?`,
      [projectId]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not update project.",
    });
  }
};

const deleteProject = async (req, res) => {
  const projectId = Number(req.params.id);

  try {
    const [rows] = await db.query(
      `SELECT ${projectSelectFields} FROM projects WHERE id = ?`,
      [projectId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Project not found.",
      });
    }

    await db.query("DELETE FROM projects WHERE id = ?", [projectId]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not delete project.",
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};