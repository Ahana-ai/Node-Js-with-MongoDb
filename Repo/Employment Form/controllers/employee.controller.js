const emp = require('../models/employee.models');

class EmployeeApp
{
    async index (req, res) {
        let employeeData = await emp.find({});
        res.render('employee', {
            Page_title: 'Employee || Home',
            employeeData
        })
    }

    async insert (req, res) {
        try{
            console.log(req.body);
            let saveData = await emp.create(req.body);
            if (saveData && saveData.__id) {
                console.log('Data Saved!');
                res.redirect('/');
            } else {
                console.log('Data not Saved!');
                res.redirect('/');
            }

        }catch(err){
            throw err;
        }
    }
}

module.exports = new EmployeeApp();