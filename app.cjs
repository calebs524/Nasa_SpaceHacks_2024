const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/newuser', (req, res) => {
    res.sendFile(path.join(__dirname, 'newuser.html'))
});

app.get('/authenticate', (req, res) => {
    res.sendFile(path.join(__dirname, 'authenticate.html'))
});

app.get('/dashboard', (req, res) => {
        res.sendFile(path.join(__dirname, 'dashboard.html'))
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});