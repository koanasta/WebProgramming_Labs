const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 5000;


app.use(cors()); 
app.use(express.json()); 

app.use('/images', express.static(path.join(__dirname, 'public/images')));


const dbPath = path.resolve(__dirname, "contacts.db"); 
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Помилка підключення до бази:", err.message);
    } else {
        console.log("Підключено до SQLite бази контактів");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        email TEXT,
        category TEXT,
        experience INTEGER,
        image TEXT,
        description TEXT
    )
`);


db.get("SELECT COUNT(*) AS count FROM contacts", (err, row) => {
    if (err) {
        console.error("Помилка SELECT:", err.message);
        return;
    }

    if (!row || row.count === 0) {
            
        const defaultImage = '/images/person.jpg'; 

        const defaultItems = [
            ["Olexandr Kovalenko", "+380501234567", "olexandr@dev.com", "Software Engineer", 5, defaultImage, "Senior React developer."],
            ["Maria Ivanova", "+380679876543", "maria@design.com", "UI/UX Designer", 8, defaultImage, "Expert in user-centric design."],
            ["Serhiy Petrenko", "+380931122334", "serhiy@pm.com", "Project Manager", 10, defaultImage, "Certified Scrum Master."],
            ["Anna Melnyk", "+380447008090", "anna@qa.com", "QA Specialist", 3, defaultImage, "Automation and manual testing."],
            ["Volodymyr Lysenko", "+380665554433", "volodymyr@hr.com", "HR Manager", 7, defaultImage, "Talent acquisition specialist."]
        ];

        const sql = `
            INSERT INTO contacts (name, phone, email, category, experience, image, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        defaultItems.forEach(item => db.run(sql, item));
        console.log("Стартові контакти додані!");
    }
});


app.get("/contacts", (req, res) => {
    let { q, category } = req.query; 

    let sql = "SELECT * FROM contacts";
    const params = [];
    const conditions = [];

   
    if (category) {
        conditions.push("category = ?");
        params.push(category);
    }
  
    if (q) {
        conditions.push("(name LIKE ? OR phone LIKE ? OR email LIKE ?)");
        const searchPattern = `%${q}%`;
        params.push(searchPattern, searchPattern, searchPattern);
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }
    
    sql += " ORDER BY name ASC";

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


app.get("/contacts/:id", (req, res) => {
    const id = req.params.id;
    

    db.get("SELECT * FROM contacts WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Contact not found" });
        res.json(row);
    });
});


app.post("/contacts", (req, res) => {
    const { name, phone, email, category, experience, image, description } = req.body;

    if (!name || !phone || !email || !category) {
        return res.status(400).json({ error: "Missing required fields (name, phone, email, category)" });
    }

    const img = image || "/images/person.jpg";
    const exp = experience || 0; 
    db.run(
        "INSERT INTO contacts (name, phone, email, category, experience, image, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, phone, email, category, exp, img, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({
                id: this.lastID,
                name, phone, email, category, 
                experience: exp,
                image: img,
                description,
            });
        }
    );
});



app.put("/contacts/:id", (req, res) => {
    const id = req.params.id;
    const { name, phone, email, category, experience, image, description } = req.body;

    db.run(
        "UPDATE contacts SET name=?, phone=?, email=?, category=?, experience=?, image=?, description=? WHERE id=?",
        [name, phone, email, category, experience, image, description, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Contact not found" });

            res.json({
                id, name, phone, email, category, experience, image, description
            });
        }
    );
});


app.delete("/contacts/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM contacts WHERE id=?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Contact not found" });
        res.json({ message: "Contact deleted successfully", id });
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});