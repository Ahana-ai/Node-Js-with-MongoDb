const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({
    extended: true
}));


//setting the .env file
require('dotenv').config();


//connecting the public folder
app.use(express.static(path.join(__dirname, 'public')));

//setting the view engine and connecting the views folder
app.set('views', 'views');
app.set('view engine', 'ejs');

//setting the cookie parser
app.use(cookieParser());

//setting up the connect-flash and express-session
app.use(session({
    secret: 'M3S3CR3PKY5',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

//setting up the web token
const jwtAuth = require('./middleware/authJwt');
app.use(jwtAuth.authJwt);

//setting up the routes for the server
const router = require('./routes/form.router');
app.use(router);

//creating the port for the server
const port = process.env.port || 1250;

//setting dbDriver in mongoose
const dbDriver = "mongodb+srv://ahana100:5vXA4txUgGkchkUb@cluster0.djmj1ek.mongodb.net/forms";

mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    app.listen(port, () => {
        console.log(`Server is running @ http://localhost:${port}`);
    });
}).catch((err) => {
    throw err;
})