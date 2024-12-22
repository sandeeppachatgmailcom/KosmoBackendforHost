

const express = require("express");
let router = express.Router();



const entityAuth = require("../../middleware/authorization/commonEntityAuthorization/commonEntityAuthorization");

const caseSheetController = require("../controller/caseSheet.controller");



const {
    uploadInvestigation,
} = require('../../utils/multer');




// -------- case sheet routes starts here ----------


// cheif complain part
router.post('/createCheifComplaints', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createCheifComplaints);
router.put('/updateCheifComplaints', entityAuth.authorizeEntity("Patient", "Case Sheet", "update"), caseSheetController.updateCheifComplaints);
router.post('/deleteCheifComplaints', entityAuth.authorizeEntity("Patient", "Case Sheet", "softDelete"), caseSheetController.deleteCheifComplaints);

// clinical finding part
router.post('/createClinicalFinding', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createClinicalFinding);
router.put('/updateClinicalFinding', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateClinicalFinding);
router.post('/deleteClinicalFinding', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteClinicalFinding);

// medical history
router.post('/createMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createMedicalHistory);
router.put('/updateMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateMedicalHistory);
router.post('/deleteMedicalHistory', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteMedicalHistory);

// investigaton
router.post('/createInvestigation', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, caseSheetController.createInvestigation);
router.post('/updateInvestigation', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, caseSheetController.updateInvestigation);
router.post('/deleteInvestigation', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteInvestigation);

// other attachment
router.post('/createOtherAttachment', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, caseSheetController.createOtherAttachment);
router.post('/updateOtherAttachment', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), (req, res, next) => {
    uploadInvestigation.single("file")(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(statusCode.BadRequest).send({
                    message: 'File too large. Maximum file size allowed is 1 MB.'
                });
            } else {
                console.error('Multer Error:', err.message);
                return res.status(statusCode.BadRequest).send({
                    message: err.message
                });
            }
        }
        next();
    });
}, caseSheetController.updateOtherAttachment);
router.post('/deleteOtherAttachment', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteOtherAttachment);

// notes
router.post('/createNotes', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createNotes);
router.put('/updateNotes', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateNotes);
router.post('/deleteNotes', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteNotes);

// services
router.post('/createServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createServices);
router.put('/updateServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateServices);
router.post('/deleteServices', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteServices);

// procedures
router.post('/createProcedure', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.createProcedure);
router.put('/updateProcedure', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.updateProcedure);
router.delete('/deleteProcedure', entityAuth.authorizeEntity("Patient", "Case Sheet", "create"), caseSheetController.deleteProcedure);

// remove from draft
router.post('/removeAsDraft',entityAuth.authorizeEntity("Patient", "Case Sheet", "create"),caseSheetController.removeAsDraft)

// -------- case sheet routes ends here ----------

// ------- case sheet details routes starts here ------

router.get('/listCaseSheet', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.listCaseSheet);
router.get('/getCaseSheet/:clientId/:caseSheetId',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getParticularCaseSheet)
router.get('/getAllDraftedCaseSheet/:clientId/:patientId', entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getAllDrafted);

// ------- case sheet details routes ends here ------

// ------- Treatment plan routes starts starts here -------

router.get('/getTreatmentPlan/:clientId/:caseSheetId',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.getTreatmentPlan)
router.put('/updateTreatmentProcedure',entityAuth.authorizeEntity("Patient", "Case Sheet", "view"), caseSheetController.updateTreatmentProcedure)



// ------- Treatment plan routes starts starts here -------







exports.router = router;
