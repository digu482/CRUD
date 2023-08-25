const mongoose = require('mongoose');
const adminschema = new mongoose.Schema({
    Name :{
        type : String
    },
    adminName : {
        type : String
    },
    profile : {
        type : Array
    },
    document : {
        type : Array
    },
    email : {
        type : String, 
        unique : true
    },
    mobile : {
        type : Number
    },
    password : {
        type : String
    },
    token: {
        type: String
    }
},{ versionKey: false })
    

const admin = new mongoose.model('admin', adminschema);

module.exports = admin;