import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import connection from "../../db/connection.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM events ORDER BY id DESC"
    );

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
    const events = rows.map((ev) => ({
      ...ev,
      image_url: ev.image_url ? `${baseUrl}${ev.image_url}` : null,
    }));

    res.json(events);
  } catch (err) {
    console.error("Fetch events error:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// ✅ Add new event
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;
    const imageFile = req.file ? req.file.filename : null;

    const [result] = await connection.execute(
      "INSERT INTO events (name, category, day, dept, time, venue, `desc`, prize, capacity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, category, day, dept, time, venue, desc, prize, capacity, imageFile]
    );

    res.status(201).json({ message: "Event added successfully", id: result.insertId });
  } catch (err) {
    console.error("Add event error:", err);
    res.status(500).json({ message: "Failed to add event" });
  }
});

// ✅ Update existing event
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, day, dept, time, venue, desc, prize, capacity } = req.body;

    let imageUpdateQuery = "";
    let params = [name, category, day, dept, time, venue, desc, prize, capacity];

    if (req.file) {
      imageUpdateQuery = ", image_url = ?";
      params.push(req.file.filename);
    }

    params.push(id);

    const query = `
      UPDATE events 
      SET name=?, category=?, day=?, dept=?, time=?, venue=?, \`desc\`=?, prize=?, capacity=? ${imageUpdateQuery}
      WHERE id=?`;

    await connection.execute(query, params);

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({ message: "Failed to update event" });
  }
});

// ✅ Delete event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Get image filename before deleting
    const [rows] = await connection.execute("SELECT image_url FROM events WHERE id = ?", [id]);
    if (rows.length && rows[0].image_url) {
      const filePath = path.join(uploadDir, rows[0].image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await connection.execute("DELETE FROM events WHERE id = ?", [id]);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;
