require("dotenv").config();
    
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const Contact = require("./models/contact.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Connected..."))
    .catch(err => console.error(" MongoDB Connection Error:", err));

// Routes
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Handle form submission
app.post("/submit", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.redirect("/contact?success=false&error=All fields are required");
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.redirect("/contact?success=true");
    } catch (error) {
        console.error(error);
        res.redirect("/contact?success=false&error=Server error");
    }
});


app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
