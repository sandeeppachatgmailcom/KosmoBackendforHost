// services/chairService.js
const { getClientDatabaseConnection } = require("../../db/connection");
const clinetUserSchema = require("../../client/model/user");
const clinetPatientSchema = require("../../client/model/patient");
const caseSheetSchema = require("../../client/model/caseSheet")

const message = require("../../utils/message");
const statusCode = require("../../utils/http-status-code");

const CustomError = require("../../utils/customeError");
const { default: mongoose } = require("mongoose");

const create = async (clientId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        return await CaseSheet.create(data);
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const update = async (clientId, caseSheetId, data) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        Object.assign(existing, data);
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteCheifComplaints = async (clientId, caseSheetId, cheifComplaintId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const cheifComlaintArray = existing?.cheifComplaints;
        const mongObjId = new mongoose.Types.ObjectId(cheifComplaintId);
        const newCheifComplaint = cheifComlaintArray.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        
        existing.cheifComplaints = newCheifComplaint;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteClinicalFinding = async (clientId, caseSheetId, clinicalFindingId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const clinicalFindingsArray = existing?.clinicalFindings;
        const mongObjId = new mongoose.Types.ObjectId(clinicalFindingId);
        const newArray = clinicalFindingsArray.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.clinicalFindings = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteMedicalHistory = async (clientId, caseSheetId, medicalHistoryId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const medicalHistoryArray = existing?.medicalHistory;
        const mongObjId = new mongoose.Types.ObjectId(medicalHistoryId);
        const newArray = medicalHistoryArray.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.medicalHistory = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteInvestigation = async (clientId, caseSheetId, investigationId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const investigationArray = existing?.investigation;
        const mongObjId = new mongoose.Types.ObjectId(investigationId);
        const newArray = investigationArray.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.investigation = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteOtherAttachment = async (clientId, caseSheetId, otherAttachmentId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const otherAttachmentArray = existing?.otherAttachment;
        const mongObjId = new mongoose.Types.ObjectId(otherAttachmentId);
        const newArray = otherAttachmentArray.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.otherAttachment = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteNote = async (clientId, caseSheetId, noteId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const noteArray = existing?.note;
        const mongObjId = new mongoose.Types.ObjectId(noteId);
        const newArray = noteArray.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.note = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteServices = async (clientId, caseSheetId, serviceId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const array = existing?.services;
        const mongObjId = new mongoose.Types.ObjectId(serviceId);
        const newArray = array.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.services = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const deleteProcedure = async (clientId, caseSheetId, procedureId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const array = existing?.procedures;
        const mongObjId = new mongoose.Types.ObjectId(procedureId);
        const newArray = array.filter((item) =>{
            return !item._id.equals(mongObjId)
        });
        existing.procedures = newArray;
        return  await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error deleting cheif complaint of case sheet: ${error.message}`);
    }
};

const list = async (clientId, filters = {}, options = { page: 1, limit: 10 }) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [patients, total] = await Promise.all([
            CaseSheet.find(filters).skip(skip).limit(limit).sort({ _id: -1 }),
            CaseSheet.countDocuments(filters),
        ]);
        return { count: total, patients };
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error listing patient: ${error.message}`);
    }
};

const getById = async (clientId, caseSheetId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const caseSheet = await CaseSheet.findById(caseSheetId);
        if (!caseSheet) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        return caseSheet;
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error getting case sheet: ${error.message}`);
    }
};

const updateTreatmentProcedure = async (clientId, caseSheetId, procedureId) => {
    try {
        const clientConnection = await getClientDatabaseConnection(clientId);
        const CaseSheet = clientConnection.model('caseSheet', caseSheetSchema);
        const existing = await CaseSheet.findById(caseSheetId);
        if (!existing) {
            throw new CustomError(statusCode.NotFound, message.lblCaseSheetNotFound);
        }
        const newProcedureArray = existing?.procedures?.map((item) => {
            if(item?._id == procedureId){
                item.finished = true
            }else{
                return item
            }
        })
        existing.procedures = newProcedureArray
        return await existing.save();
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error in updating treatment procedure: ${error.message}`);
    }
};

module.exports = {
    create,
    update,
    deleteCheifComplaints,
    deleteClinicalFinding,
    deleteMedicalHistory,
    deleteInvestigation,
    deleteOtherAttachment,
    deleteNote,
    deleteServices,
    deleteProcedure,
    list,
    getById,
    updateTreatmentProcedure
};
