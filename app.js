const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Setup session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret key
    resave: false,
    saveUninitialized: false
}));

// Initialize flash middleware
app.use(flash());

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Import routes
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

// Redirect root URL to login page
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
