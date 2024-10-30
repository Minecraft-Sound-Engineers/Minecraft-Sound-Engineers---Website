const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

// Import controllers, routes and models
const Version = require('./models/version');
const { getAllVersions } = require('./controllers/versioncontroller');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4001;
const MongoURI = process.env.MONGOURI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine and express static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.static(path.join(__dirname, 'public')));

// Use the Routes
app.use('/auth', authRoutes);

// Database connection
mongoose
    .connect(MongoURI)
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err)
    })


function authenticate(req, res, next) {
    // Example: check for token in cookies or session
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    
    // Assuming token verifies and fetches the user
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/auth/login');
        }

        // Add the user information to the req object
        req.user = { username: decoded.username };
        next();
    });
}
    

app.post('/add-version', async (req, res) => {
    try {
        const { name, mversion, version } = req.body;

        const newVersion = new Version({
            name,
            version,
            mversion,
        });

        const savedVersion = await newVersion.save();

        res.status(201).json(savedVersion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/admin', (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }
    res.render('admin', { user: req.user });
});

app.get('/', (req, res) => {
    res.render('index', { title: "Home" })
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get('/downloads', (req, res) => {
    res.render('download', { title: "Download" });
});

app.get('/downloadversions', async (req, res) => {
    try {
        const versions = await getAllVersions();
        res.render('downloads', { title: "Download Your Version", versions });
    } catch (err) {
        console.error('Error fetching versions for downloads: ', err);
        res.status(500).send("Error loading versions.");
    }
});

app.get('/faq', (req, res) => {
    res.render('faq', { title: "FAQ" });
});

app.post('/logout', (req, res) => {
    // Invalidate token logic can be implemented if you are storing them in a session
    res.clearCookie('token')
    res.redirect('/'); // Redirect to home after logout
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
