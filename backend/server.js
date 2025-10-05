const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/studentDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(err));

// =======================
// 🚀 CRUD ROUTES
// =======================

// READ: Get all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// CREATE: Add new student
app.post("/students", async (req, res) => {
  const { name, email, course } = req.body;
  const student = new Student({ name, email, course });
  await student.save();
  res.json({ message: "Student added successfully!" });
});

// UPDATE: Edit student details
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  await Student.findByIdAndUpdate(id, { name, email, course });
  res.json({ message: "Student updated successfully!" });
});

// DELETE: Remove student
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
