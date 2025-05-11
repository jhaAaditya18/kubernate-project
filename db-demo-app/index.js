const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (local)
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Define Mongoose schema and model
const Email = mongoose.model('Email', {
    email: String,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle email submission
app.post('/add-email', async (req, res) => {
    const { email } = req.body;
    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding email');
    }
});

// API to get all emails
app.get('/emails', async (req, res) => {
    try {
        const emails = await Email.find({});
        res.json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching emails');
    }
});

// Stop server (for debugging only)
app.get('/exit', (req, res) => {
    res.send('Server stopped');
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
