require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const Contact = require("./models/contact.js");
const User = require("./models/user.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));


app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});


// MongoDB Connection

mongoose.connect(process.env.MONGO_URI).then(() => console.log(" MongoDB Connected.")).catch((err) => console.error(" MongoDB Connection Error:", err));

// ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});


app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("profile", { user: req.session.user, orders: [] });
});

// Signup form
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(
        `<script>alert(" Account already exists! Please login."); window.location.href='/login';</script>`
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // save user in session
    req.session.user = newUser;

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.send(
      `<script>alert(" Error during signup!"); window.location.href='/signup';</script>`
    );
  }
});

// Login form
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.send(
        `<script>alert(" Account not exists! Please signup."); window.location.href='/signup';</script>`
      );
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send(
        `<script>alert(" Wrong password!"); window.location.href='/login';</script>`
      );
    }

    // save session
    req.session.user = user;
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.send(
      `<script>alert(" Error during login!"); window.location.href='/login';</script>`
    );
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect('/profile');
    }

    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});


// Contact form 
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.redirect(
        "/contact?success=false&error=All fields are required"
      );
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