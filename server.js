const express = require('express');
const app = express();

// Express server setup
app.use(express.static('public'));

// Define port
const port = 8000;

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});