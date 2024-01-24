const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use different base paths for different routes
app.use('/api', authRoutes);
app.use('/api/files', fileRoutes);

const hostname = 'localhost';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
