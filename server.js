const express = require('express');
const app = express();
app.listen(3000, () => console.log('Server Started'));
app.use(express.static('public'));