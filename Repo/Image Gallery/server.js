const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.urlencoded({
    extended: true
}));

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));

//setting the engines and views folder
app.set('views', 'views');
app.set('view engine', 'ejs');

//setting the router
const router = require('./routes/gallery.routes');
app.use(router);

//setting the port
const port = process.env.port || 1250;

//setting dbDriver
const dbDriver = "mongodb+srv://ahana100:5vXA4txUgGkchkUb@cluster0.djmj1ek.mongodb.net/wtsstudents";

mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    app.listen(port, () => {
        console.log(`Server is running @ http://localhost:${port}`);
    });
}).catch((err) => {
    throw err;
});