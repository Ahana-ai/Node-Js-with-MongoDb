const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const EmpSchema = new Schema({
    eName: {
        type: String,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    da: {
        type: Number,
        required: true
    },
    hra: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = new mongoose.model('employee', EmpSchema);