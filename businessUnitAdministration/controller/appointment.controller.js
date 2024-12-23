const { default: mongoose } = require("mongoose")
const sanitizeBody = require("../../utils/sanitizeBody")
const  appointmentServices = require("../services/appoinment.service")
const { getchairList } = require("../services/chairs.service")
const { listEmployeeByRole } = require("../services/clientUser.service")
const { createToken } = require("../services/token.services")

exports.postcreateBooking = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.body)
        console.log(data,'appointment data')
        const result = await appointmentServices.creatAppointment(data)
        res.status(result?.statusCode).json(result)
    } catch (error) {
        next(error)
    }
}
exports.getBookingByDate = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await appointmentServices.getBookingChart(data)
        res.status(200).json(result)
       // res.json(data)
    } catch (error) {
        next(error)
    }
} 

exports.getBookingByDateNonTabular = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        const result = await appointmentServices.getBookingChartNonTabular(data)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
} 




exports.getAvailability = async (req, res, next) => {
    try {
        const data = await sanitizeBody(req.query)
        console.log(data,'ata backend ')
        //taking the full list of chairs ,assistant,chairliist from client db 
        const doctorsList = await listEmployeeByRole({ roleId:3, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        const assistantList   =   await listEmployeeByRole({ roleId:4, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        const chairList = await getchairList({roleId:3, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        const specialist = await listEmployeeByRole({ roleId:15, clientId:data?.clientId, buId:data?.buId, branchId:data?.branchId })||[]
        
        // taking the engaged list of doctors , chairs ,dental Assistant 
        const result = await appointmentServices.generateAvailabiltyChart(data)
        const {bookedDoctors, bookedChairs, bookedAssistants,bookedSpecialist,absentees } = result;
        //console.log(bookedDoctors, bookedChairs, bookedAssistants,bookedSpecialist,'bookedDoctors, bookedChairs, bookedAssistants ' )
        
        //comparing the enagaed one with all details and return available list 
        const doctorsAvailable = doctorsList?.filter((doc) => {
            if (data?.doctorId) {
                // Match specific doctor if doctorId is provided
                return doc._id.toString() === data.doctorId;
            } else {
                // Exclude doctors in the bookedDoctors set
                return !bookedDoctors.has(doc._id.toString());
            }
        });
        const chairAvailable = chairList?.filter((doc) => {
            if (data?.chairId) {
                // Include only the chair matching `data.chairId`
                return doc._id.toString() === data.chairId;
            } else {
                // Exclude chairs in the `bookedChairs` set
                return !bookedChairs?.has(doc._id.toString());
            }
        }).map((item) => {
            return {
                chairNumber: item?.chairNumber,
                _id: item?._id,
                chairLocation: item?.chairLocation,
            };
        });
        
        const assistantAvailable =  assistantList?.filter((doc)=> !bookedAssistants?.has( doc._id.toString()) && !absentees.has( doc._id.toString()))||[]
        const specialistAvailable =  specialist?.filter((doc)=> !bookedSpecialist?.has( doc._id.toString()) && !absentees.has( doc._id.toString()))||[]
      
        res.status(200).json({message:'available slots fetched ',data:{doctorsAvailable,chairAvailable,assistantAvailable,specialistAvailable},status:true})
       // res.json(data)
    } catch (error) {
        next(error)
    }

} 

exports.delete = async (req, res, next)=>{
    try {
        const data = await sanitizeBody(req.query)
        const result = await appointmentServices.delete(data)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

exports.createToken = async (req, res, next)=>{
    try {
        const data = await sanitizeBody(req.query)
        console.log(data)
        const result = await createToken(data)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}