const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes")
const cors = require("cors")
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log('Database Connected');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/post', postRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));