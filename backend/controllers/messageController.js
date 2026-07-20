const db = require("../config/db");

const getMessages = async (req, res) => {
  try {
    const [messages] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        message,
        is_read AS isRead,
        created_at AS createdAt
      FROM messages
      ORDER BY created_at DESC
      `
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Could not load messages.",
    });
  }
};

const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email, and message are required.",
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        message,
        is_read AS isRead,
        created_at AS createdAt
      FROM messages
      WHERE id = ?
      `,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not send message.",
    });
  }
};

const markMessageAsRead = async (req, res) => {
  const messageId = Number(req.params.id);

  try {
    const [result] = await db.query(
      "UPDATE messages SET is_read = true WHERE id = ?",
      [messageId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        message,
        is_read AS isRead,
        created_at AS createdAt
      FROM messages
      WHERE id = ?
      `,
      [messageId]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not mark message as read.",
    });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = Number(req.params.id);

  try {
    const [rows] = await db.query(
      `
      SELECT
        id,
        name,
        email,
        message,
        is_read AS isRead,
        created_at AS createdAt
      FROM messages
      WHERE id = ?
      `,
      [messageId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Message not found.",
      });
    }

    await db.query("DELETE FROM messages WHERE id = ?", [messageId]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Could not delete message.",
    });
  }
};

module.exports = {
  getMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage,
};