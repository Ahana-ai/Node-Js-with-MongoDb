const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.urlencoded({
    extended: true
}));
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));

const router = require('./routes/students.routes');
app.use(router);

app.set('view engine', 'ejs');
app.set('views', 'views');

const port = process.env.PORT || 1200;

const dbDriver = "mongodb+srv://ahana100:5vXA4txUgGkchkUb@cluster0.djmj1ek.mongodb.net/wtsforms";

mongoose.connect(dbDriver, {
    useNewurlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    app.listen(port, () => {
        console.log(`Server is running @ http://localhost:${port}`);
    });
}).catch((err) => {
    console.log(err);
});