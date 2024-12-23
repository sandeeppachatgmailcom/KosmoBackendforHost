



const statusCode = require("../../utils/http-status-code");
const message = require("../../utils/message");
const { getClientDatabaseConnection } = require("../../db/connection");
const getserialNumber = require("../../model/services/getserialNumber");

const clinetBranchSchema = require("../../client/model/branch");
const clinetBusinessUnitSchema = require("../../client/model/businessUnit")
const caseSheetService = require("../services/caseSheet.service");

const CustomError = require("../../utils/customeError");





// create cheif complaints by business unit
exports.createCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, cheifComplaints, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!cheifComplaints) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await caseSheetService.create(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, cheifComplaints, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsCreatedSuccess,
            data: { cheifComplaints: newCheifComplaint.cheifComplaints, _id: newCheifComplaint._id, caseSheets: newCheifComplaint },
        });
    } catch (error) {
        next(error)
    }
};

// update cheif complaints by busines unit
exports.updateCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, cheifComplaints, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!cheifComplaints) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const newCheifComplaint = await caseSheetService.update(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, cheifComplaints,
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsUpdatedSuccess,
            data: { cheifComplaints: newCheifComplaint.cheifComplaints, _id: newCheifComplaint._id }
        });
    } catch (error) {
        next(error)
    }
};

// delete cheif complaints by business unit
exports.deleteCheifComplaints = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, cheifComplaintId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!cheifComplaintId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCheifComplaintsIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteCheifComplaints(clientId, caseSheetId, cheifComplaintId);
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsDeletedSuccess,
            data: { cheifComplaints: deleted.cheifComplaints, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};





// create clinical finding by business unit
exports.createClinicalFinding = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, clinicalFindings, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!clinicalFindings) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await caseSheetService.createClinicalFinding(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, clinicalFindings, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblCheifComplaintsCreatedSuccess,
            data: { clinicalFindings: newCheifComplaint.clinicalFindings, _id: newCheifComplaint._id, caseSheets: newCheifComplaint },
        });
    } catch (error) {
        next(error)
    }
};

// update clinical finding by busines unit
exports.updateClinicalFinding = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, clinicalFindings, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!clinicalFindings) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const newCheifComplaint = await caseSheetService.updateClinicalFinding(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, clinicalFindings,
        });
        return res.status(statusCode.OK).send({
            message: message.lblFindingsUpdated,
            data: { clinicalFindings: newCheifComplaint.clinicalFindings, _id: newCheifComplaint._id }
        });
    } catch (error) {
        next(error)
    }
};

// delete clinical finding by business unit
exports.deleteClinicalFinding = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, clinicalFindingId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!clinicalFindingId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinicalFindingIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteClinicalFinding(clientId, caseSheetId, clinicalFindingId);
        return res.status(statusCode.OK).send({
            message: message.lblClinicalFindingDeletedSuccess,
            data: { clinicalFindings: deleted.clinicalFindings, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};






// create medical history by business unit
exports.createMedicalHistory = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, medicalHistory, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!medicalHistory) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await caseSheetService.createMedicalHistory(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, medicalHistory, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryCreatedSuccess,
            data: { medicalHistory: created.medicalHistory, _id: created._id, caseSheets: created },
        });
    } catch (error) {
        next(error)
    }
};

// update medical history by busines unit
exports.updateMedicalHistory = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, medicalHistory, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!medicalHistory) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const updated = await caseSheetService.updateMedicalHistory(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, medicalHistory,
        });
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryUpdatedSuccess,
            data: { medicalHistory: updated.medicalHistory, _id: updated._id }
        });
    } catch (error) {
        next(error)
    }
};

// delete medical history by business unit
exports.deleteMedicalHistory = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, medicalHistoryId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!medicalHistoryId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblMedicalHistoryIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteMedicalHistory(clientId, caseSheetId, medicalHistoryId);
        return res.status(statusCode.OK).send({
            message: message.lblMedicalHistoryDeletedSuccess,
            data: { medicalHistory: deleted.medicalHistory, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};

// create investigation by business unit
exports.createInvestigation = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, fileType, remark } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!fileType || !remark) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        let dataObject = {
            fileType : fileType,
            remark : remark,
        }
        if (req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await caseSheetService.createInvestigation(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, investigation: [dataObject], displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblInvestigationCreatedSuccess,
            data: { investigation: created.investigation, _id: created._id, caseSheets: created },
        });
    } catch (error) {
        next(error)
    }
};

// update investigation by busines unit
exports.updateInvestigation = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId,  fileType, remark , } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!fileType || !remark ) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        let dataObject = {
            fileType : fileType,
            remark : remark,
        }
        if (req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const updated = await caseSheetService.updateInvestigation(clientId, caseSheetId, dataObject);
        return res.status(statusCode.OK).send({
            message: message.lblInvestigationUpdatedSuccess,
            data: { investigation: updated.investigation, _id: updated._id, },
        });
    } catch (error) {
        next(error)
    }
};

// delete investigation by business unit
exports.deleteInvestigation = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, investigationId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!investigationId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblInvestigationIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteInvestigation(clientId, caseSheetId, investigationId);
        return res.status(statusCode.OK).send({
            message: message.lblInvestigationDeletedSuccess,
            data: { investigation: deleted.investigation, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};

// create other attachment by business unit
exports.createOtherAttachment = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, remark, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!remark) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        let dataObject = {
            remark: remark,
        }
        if (req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await caseSheetService.createOtherAttachment(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, otherAttachment: [dataObject], displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblOtherAttachmentCreatedSuccess,
            data: { otherAttachment: created.otherAttachment, _id: created._id, caseSheets: created },
        });
    } catch (error) {
        next(error)
    }
};

// update other attachment by busines unit
exports.updateOtherAttachment = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, remark, } = req.body;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!remark) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        let dataObject = {
            remark: remark,
        }
        if (req.file?.filename) {
            dataObject.file = req.file.filename;
        }
        const updated = await caseSheetService.updateOtherAttachment(clientId, caseSheetId, dataObject);
        return res.status(statusCode.OK).send({
            message: message.lblOtherAttachmentUpdatedSuccess,
            data: { otherAttachment: updated.otherAttachment, _id: updated._id, },
        });
    } catch (error) {
        next(error)
    }
};

// delete other attachment by business unit
exports.deleteOtherAttachment = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, otherAttachmentId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!otherAttachmentId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblInvestigationIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteOtherAttachment(clientId, caseSheetId, otherAttachmentId);
        return res.status(statusCode.OK).send({
            message: message.lblOtherAttachmentDeletedSuccess,
            data: { otherAttachment: deleted.otherAttachment, _id: deleted._id, },
        });
    } catch (error) {
        next(error)
    }
};












// create notes by business unit
exports.createNotes = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, note, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!note) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const created = await caseSheetService.createNote(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, note, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblNoteCreatedSuccess,
            data: { note: created.note, _id: created._id, caseSheets: created },
        });
    } catch (error) {
        next(error)
    }
};

// update notes by busines unit
exports.updateNotes = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, note, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!note) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const updated = await caseSheetService.updateNote(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, note,
        });
        return res.status(statusCode.OK).send({
            message: message.lblNoteUpdatedSuccess,
            data: { note: updated.note, _id: updated._id }
        });
    } catch (error) {
        next(error)
    }
};

// delete notes by business unit
exports.deleteNotes = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, noteId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!noteId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblNoteIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteNote(clientId, caseSheetId, noteId);
        return res.status(statusCode.OK).send({
            message: message.lblNoteDeletedSuccess,
            data: { note: deleted.note, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};


















// create services by business unit
exports.createServices = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, services, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!services) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await caseSheetService.createService(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, services, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblServicesCreatedSuccess,
            data: { services: newCheifComplaint.services, _id: newCheifComplaint._id, caseSheets: newCheifComplaint },
        });
    } catch (error) {
        next(error)
    }
};

// update services by busines unit
exports.updateServices = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, services, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!services) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const newCheifComplaint = await caseSheetService.updateService(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, services,
        });
        return res.status(statusCode.OK).send({
            message: message.lblServicesUpdatedSuccess,
            data: { services: newCheifComplaint.services, _id: newCheifComplaint._id }
        });
    } catch (error) {
        next(error)
    }
};

// delete services by business unit
exports.deleteServices = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, serviceId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!serviceId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblServicesIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteServices(clientId, caseSheetId, serviceId);
        return res.status(statusCode.OK).send({
            message: message.lblServicesDeletedSuccess,
            data: { services: deleted.services, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};




// create procedure by business unit
exports.createProcedure = async (req, res, next) => {
    try {
        const { clientId, patientId, branchId, businessUnitId, procedures, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!procedures) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const serialNumber = await getserialNumber('caseSheet', clientId, "", businessUnitId)
        const newCheifComplaint = await caseSheetService.create(clientId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, procedures, displayId: serialNumber,
        });
        return res.status(statusCode.OK).send({
            message: message.lblProcedureCreatedSuccess,
            data: { caseSheetId: newCheifComplaint._id },
        });
    } catch (error) {
        next(error)
    }
};

// update procedure by busines unit
exports.updateProcedure = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, patientId, branchId, businessUnitId, procedures, } = req.body;
        const mainUser = req.user;
        await commonCheck(clientId, patientId, branchId, businessUnitId);
        if (!procedures) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const newCheifComplaint = await caseSheetService.updateProcedure(clientId, caseSheetId, {
            patientId, branchId, businessUnitId, createdBy: mainUser?._id, procedures,
        });
        return res.status(statusCode.OK).send({
            message: message.lblProcedureUpdatedSuccess,
            data: { procedures: newCheifComplaint.procedures, _id: newCheifComplaint._id }
        });
    } catch (error) {
        next(error)
    }
};

// delete procedure by business unit
exports.deleteProcedure = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, procedureId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!procedureId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblProcedureIdRequired,
            });
        }
        const deleted = await caseSheetService.deleteProcedure(clientId, caseSheetId, procedureId);
        return res.status(statusCode.OK).send({
            message: message.lblProcedureDeletedSuccess,
            data: { procedures: deleted.procedures, _id: deleted._id }
        });
    } catch (error) {
        next(error)
    }
};


// remove as draft
exports.removeAsDraft = async (req, res, next) => {
    try {
        const { clientId, caseSheetId } = req.body;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!caseSheetId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCaseSheetIdIdRequired,
            });
        }
        const update = await caseSheetService.updateDraft(clientId, caseSheetId, {
            drafted: false
        });
        return res.status(statusCode.OK).send({
            message: message.lblCaseSheetCreatedSuccess,
            data: { caseSheetId: update?._id }
        });
    } catch (error) {
        next(error)
    }
};




// list case sheet
exports.listCaseSheet = async (req, res, next) => {
    try {
        const { clientId, keyword = '', page = 1, perPage = 10, } = req.query;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        const filters = {
            deletedAt: null,
            // ...(keyword && {
            //     $or: [
            //         { firstName: { $regex: keyword.trim(), $options: "i" } },
            //         { lastName: { $regex: keyword.trim(), $options: "i" } },
            //         { email: { $regex: keyword.trim(), $options: "i" } },
            //         { phone: { $regex: keyword.trim(), $options: "i" } },
            //     ],
            // }),
        };
        const result = await caseSheetService.list(clientId, filters, { page, limit: perPage });
        return res.status(statusCode.OK).send({
            message: message.lblCaseSheetFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// get all drafted case sheet
exports.getAllDrafted = async (req, res, next) => {
    try {
        const { clientId, patientId } = req.params;
        if (!clientId || !patientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblRequiredFieldMissing,
            });
        }
        const filters = {
            deletedAt: null,
            patientId: patientId,
            status: "Proposed"
        };
        const result = await caseSheetService.listDrafted(clientId, filters);
        return res.status(statusCode.OK).send({
            message: message.lblCaseSheetFoundSucessfully,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



// get particular case sheet
exports.getParticularCaseSheet = async (req, res, next) => {
    try {
        const { clientId, caseSheetId } = req.params;
        if (!clientId || !caseSheetId) {
            return res.status(400).send({
                message: message.lblCaseSheetIdIdAndClientIdRequired,
            });
        }
        const caseSheet = await caseSheetService.getById(clientId, caseSheetId);
        return res.status(200).send({
            message: message.lblCaseSheetFoundSucessfully,
            data: caseSheet,
        });
    } catch (error) {
        next(error)
    }
};


// get treatment plan 
exports.getTreatmentPlan = async (req, res, next) => {
    try {
        const { clientId, caseSheetId } = req.params;
        if (!clientId || !caseSheetId) {
            return res.status(400).send({
                message: message.lblCaseSheetIdIdAndClientIdRequired,
            });
        }
        const caseSheet = await caseSheetService.getById(clientId, caseSheetId);
        return res.status(200).send({
            message: message.lblCaseSheetFoundSucessfully,
            data: caseSheet.procedures,
        });
    } catch (error) {
        next(error)
    }
};


// update procedure
exports.updateTreatmentProcedure = async (req, res, next) => {
    try {
        const { clientId, caseSheetId, procedureId, } = req.body;
        const mainUser = req.user;
        if (!clientId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblClinetIdIsRequired,
            });
        }
        if (!caseSheetId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblCaseSheetIdIdRequired,
            });
        }
        if (!procedureId) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblProcedureIdRequired,
            });
        }
        const updated = await caseSheetService.updateTreatmentProcedure(clientId, caseSheetId, procedureId);
        return res.status(statusCode.OK).send({
            message: message.lblProcedureUpdatedSuccess,
            data: { caseSheetId: updated._id },
        });
    } catch (error) {
        next(error)
    }
};












async function commonCheck(clientId, patientId, branchId, businessUnitId) {
    try {
        if (!clientId) {
            throw new CustomError(statusCode.BadRequest, message.lblClinetIdIsRequired);
        }
        if (!patientId) {
            throw new CustomError(statusCode.BadRequest, message.lblPatientIdRequired);
        }
        if (!branchId) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchIRequired);
        }
        if (!businessUnitId) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitIdIsRequired);
        }
        const clientConnection = await getClientDatabaseConnection(clientId);
        const Branch = clientConnection.model('branch', clinetBranchSchema);
        const BusinessUnit = clientConnection.model('businessUnit', clinetBusinessUnitSchema);
        const branch = await Branch.findById(branchId);
        if (!branch) {
            throw new CustomError(statusCode.BadRequest, message.lblBranchNotFound);
        }
        const bu = await BusinessUnit.findById(businessUnitId)
        if (!bu) {
            throw new CustomError(statusCode.BadRequest, message.lblBusinessUnitNotFound);
        }
    } catch (error) {
        throw new CustomError(error.statusCode || 500, `Error creating case sheet: ${error.message}`);
    }
}