
const mongoose = require('mongoose')
const { index } = require('./branch')
const medicalCasesSchema =  mongoose.Schema({
    caseId:{type:String,unique:true,required:true},
    caseName:{type:String,unique:true,required:true},
    remark:{type:String},
    deletedAt:{type:Date },
    isActive:{type:Boolean,default:true},
    createdBy:{type:mongoose.Schema.ObjectId,ref:'clientusers',index:true,default:null}
})

module.exports = medicalCasesSchema