const Student = require('../models/students.models');

exports.create = (req, res) => {
    res.render('index', {
        Page_title: 'Home'
    })
};

exports.insert = async(req, res) => {
    try{
        //trimming away the spaces
        console.log(req.body);
        req.body.firstName = req.body.firstName.trim();
        req.body.lastName = req.body.lastName.trim();

        //empty field checking
        if(!req.body.firstName && !req.body.lastName){
            console.log('Field Should not be Empty!');
            res.redirect('/');
        }

        //checking if email exists
        let isemailExists = await Student.find({email: req.body.email});
        if(!isemailExists.length){
            req.body.fullName = `${req.body.firstName} ${req.body.lastName}`;
            let saveStudent = await Student.create(req.body);
            console.log(saveStudent);

            if(saveStudent && saveStudent._id){
                console.log('Data Added Successfully!!');
                res.redirect('/');
            }else{
                console.log('Data Not Added');
                res.redirect('/');
            }
        }else{
            console.log('Email Already Exists!');
            res.redirect('/');
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}

exports.studentView = async(req, res) => {
    try{
        let studentData = await Student.find({});
        res.render('studentView', {
            Page_title: 'Student || View',
            studentData
        })
    }catch(err){
        console.log(err);
        throw err;
    }
}