const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

// Route to create an admin account
router.post('/create-admin', async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    if(!password) {
        return res.status(400).json({ error: 'Password is required' })
    }
    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this username already exists' });
        }

        // Create a new admin account
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        res.redirect('/auth/login')
    } catch (err) {
        res.status(500).json({ error: 'Error creating admin' });
    }
});

// Route to login an admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    
    if(!password) {
        return res.status(400).json({ error: 'Password is required' })
    }

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.redirect('/admin');
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register', { title: "Register a new admin" });
});

router.get('/login', (req, res) => {
    res.render('auth/login', { title: "Login To your admin account" })
})

module.exports = router;
