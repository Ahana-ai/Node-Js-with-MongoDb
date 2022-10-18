const mongoose = require('Mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ""
    },
    Gender: {
        type: String,
        possibleValues: [' Male', ' Female', ' Others'],
        required: true
    },
    Class: {
        type: String,
        enum: ['10', '11', '12', 'Other']
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = new mongoose.model('form', StudentSchema);