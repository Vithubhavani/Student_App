
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Get students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// Add student
app.post("/students", (req, res) => {
    const { name, course } = req.body;

    db.query(
        "INSERT INTO students (name, course) VALUES (?, ?)",
        [name, course],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Student added successfully" });
        }
    );
});

// Delete student
app.delete("/students/:id", (req, res) => {
    db.query(
        "DELETE FROM students WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Student deleted successfully" });
        }
    );
});

app.listen(5500, () => {
    console.log("Backend running on port 5500");
});
