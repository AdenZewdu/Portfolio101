const db = require("../config/db");

const getSkills = async (req, res) => {
  try {
    const [skills] = await db.query(
      "SELECT id, name FROM skills ORDER BY id ASC"
    );

    res.json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Could not load skills.",
    });
  }
};

const createSkill = async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Skill name is required.",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO skills (name) VALUES (?)",
      [name.trim()]
    );

    const [rows] = await db.query(
      "SELECT id, name FROM skills WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not create skill.",
    });
  }
};

const updateSkill = async (req, res) => {
  const skillId = Number(req.params.id);
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Skill name is required.",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE skills SET name = ? WHERE id = ?",
      [name.trim(), skillId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Skill not found.",
      });
    }

    const [rows] = await db.query(
      "SELECT id, name FROM skills WHERE id = ?",
      [skillId]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not update skill.",
    });
  }
};

const deleteSkill = async (req, res) => {
  const skillId = Number(req.params.id);

  try {
    const [rows] = await db.query(
      "SELECT id, name FROM skills WHERE id = ?",
      [skillId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Skill not found.",
      });
    }

    await db.query("DELETE FROM skills WHERE id = ?", [skillId]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not delete skill.",
    });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};