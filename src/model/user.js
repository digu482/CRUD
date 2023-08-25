const mongoose = require('mongoose');
const Userschema = new mongoose.Schema({
    Name :{
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
        type : Number,
        unique:true
    },
    password : {
        type : String
    },
    isdelete : {
        type : Boolean,
        default : false
    },
    token: {
        type: String
    }
},{ versionKey: false })

const User = new mongoose.model('User', Userschema);

module.exports = User;