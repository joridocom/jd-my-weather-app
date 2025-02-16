const express = require('express');
const app = express();

// Express server setup
app.use(express.static('public'));