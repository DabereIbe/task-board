require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const boardRoutes = require('./routes/board.js');
const authMiddleware = require('./middleware/authMiddleware.js');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

// Example of a protected route
// app.get('/api/protected', authMiddleware, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});