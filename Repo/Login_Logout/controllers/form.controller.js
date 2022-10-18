const Form = require('../models/form.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class App {
    /**
     * @method register
     * @description to get the form
     */
    async register(req, res) {
        try {
            res.render('register', {
                message: req.flash('message'),
                user: req.user
            });
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method getDetails
     * @description to get the details in the form
     */
    async getDetails(req, res) {
        try {
            //Removing the spaces
            req.body.name = req.body.name.trim();
            req.body.email = req.body.email.trim();
            req.body.password = req.body.password.trim();

            //Checking if the fields are blank or not
            if (!req.body.name || !req.body.email || !req.body.password) {
                req.flash('message', "Field Should Not Be Empty!!");
                res.redirect('/register');
            }

            //Checking if email already exists
            let isEmailExists = await Form.find({ email: req.body.email });

            if (!isEmailExists.length) {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

                let Data = await Form.create(req.body);

                //Checking to see if Data is Saved
                if (Data && Data._id) {
                    req.flash('message', 'Registration Successful!!');
                    res.redirect('/register');
                } else {
                    req.flash('message', 'Registration Not Successful!!');
                    res.redirect('/register');
                }
                console.log(Data);
            } else {
                req.flash('message', 'Email Already Exists!!');
                res.redirect('/register');
            }

        } catch (err) {
            throw err;
        }
    }

     /**
      * @method userAuth
      * @description To authenticate users
      */
        async userAuth(req, res, next) {
            try {
                if (req.user) {
                    next();
                } else {
                    res.redirect('/login');
                }
            } catch (err) {
                throw err;
            }
        }
    

    /**
     * @method login
     * @description shows the login page
     */
    async login(req, res) {
        try {
            res.render('index', {
                message: req.flash('message'),
                user: req.user
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method index
     * @description post the login page
     */
    async index(req, res) {
        try {
            //Removing the spaces
            req.body.email = req.body.email.trim();
            req.body.password = req.body.password.trim();

            console.log('req.user===>' + req.user);

            let isUserExists = await Form.findOne({
                email: req.body.email
            });

            if (!req.body.password || !req.body.email) {
                req.flash('message', 'Field Should Not be Empty!!');
                res.redirect('/login');
            } else {
                if (isUserExists) {
                    const hashPassword = isUserExists.password;
                    if (bcrypt.compareSync(req.body.password, hashPassword)) {
                        // token creation
                        const token = jwt.sign({
                            id: isUserExists._id,
                            email: isUserExists.email
                        }, 'M3S3CR3PKY5', { expiresIn: '24h' });

                        // req.user.token = token;
                        res.cookie('userToken', token); // Set your cookie
                        console.log('Logged In...');

                        req.flash('message', 'Welcome ' + isUserExists.name);
                        res.redirect('/dashboard');
                    } else {
                        req.flash('message', 'Wrong Password!');
                        res.redirect('/login');
                    }
                } else {
                    req.flash('message', 'Email does not exist!');
                    res.redirect('/login');
                }
                console.log('isUserExists====>' + isUserExists);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @method logout
     * @description delete cookies
     */
    async logout(req, res){
        console.log('Cookies======>' + req.cookies);
        res.clearCookie('userToken');
        console.log('Cookie Cleared!');
        res.redirect('/login');
    }

    /**
     * @method getDashboard
     * @description To render the Dashboard Page
     */
    async getDashboard(req,res){
        try {
            res.render('dashboard', {
                message: req.flash('message'),
                user: req.user
            })
        } catch (err) {
            throw err;
        }
    }

}

module.exports = new App();