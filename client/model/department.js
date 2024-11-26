const { default: mongoose } = require("mongoose");

const departmentSchema = mongoose.Schema({
    deptName : {type:String,unique:true},
    deptId : {type:String,unique:true},
    branchId : { type: mongoose.Schema.ObjectId, ref: "branch", index: true }, 
    description:{type:String} ,
    deletedAt:{type:Date,default:null},
    isActive:{type:Boolean,default:true},
    createdBy: { type: mongoose.Schema.ObjectId, ref: "clientUsers", default:null, index: true } 
})

module.exports  = departmentSchema