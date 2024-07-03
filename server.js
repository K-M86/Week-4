// Import required modules
const express = require('express');
const { Client } = require('pg');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3001; // Port to listen on

// PostgreSQL client setup
const client = new Client({
    user: 'postgres',           // Your PostgreSQL username
    host: 'localhost',          // PostgreSQL server location
    database: 'WMAssign1',      // Your database name
    password: 'postgres',       // Your PostgreSQL password
    port: 5432                  // Default PostgreSQL port
});

// Connect to PostgreSQL
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Render the main page
app.get('/', (req, res) => {
    res.render('index');
});

// API endpoint to get locations from the database
app.get('/api/locations', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM WMAssign1_table');
        res.json(result.rows);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
