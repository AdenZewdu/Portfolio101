const db = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, title, bio, about FROM profile ORDER BY id ASC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not load profile.",
    });
  }
};

const updateProfile = async (req, res) => {
  const { name, title, bio, about } = req.body;

  if (!name || !title || !bio || !about) {
    return res.status(400).json({
      message: "Name, title, bio, and about description are required.",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT id FROM profile ORDER BY id ASC LIMIT 1"
    );

    if (rows.length === 0) {
      const [result] = await db.query(
        "INSERT INTO profile (name, title, bio, about) VALUES (?, ?, ?, ?)",
        [name, title, bio, about]
      );

      const [createdRows] = await db.query(
        "SELECT id, name, title, bio, about FROM profile WHERE id = ?",
        [result.insertId]
      );

      return res.status(201).json(createdRows[0]);
    }

    const profileId = rows[0].id;

    await db.query(
      "UPDATE profile SET name = ?, title = ?, bio = ?, about = ? WHERE id = ?",
      [name, title, bio, about, profileId]
    );

    const [updatedRows] = await db.query(
      "SELECT id, name, title, bio, about FROM profile WHERE id = ?",
      [profileId]
    );

    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not update profile.",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};