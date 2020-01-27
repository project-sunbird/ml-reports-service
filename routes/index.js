var express = require('express');
var router = express.Router();
var authService = require('../services/autentication_service');

var instanceController = require('../controllers/v1/instance_observation');
var entityController = require('../controllers/v1/entity_observations');
var entitySolutionCOntroller = require('../controllers/v2/entity_observations');
var observationController = require('../controllers/v1/observation_controller');
var entityAssessController = require('../controllers/v1/entity_assessments');
var listAssessmentPrograms = require('../controllers/v1/list_assessment_programs');
var course_enrollment = require('../controllers/v1/course_enrollment');
var content_view = require('../controllers/v1/content_view');
var pdfController = require('../controllers/v1/observation_pdf_controller');
var listObservationNames = require('../controllers/v1/list_observation_names');
var observationSubmissions = require('../controllers/v1/observation_submissions');
var listObservationSolutions = require('../controllers/v1/list_observation_solutions');

//========= API calls for samiksha observation and assessment reports=============

//API router for observations instanceReport
router.post("/observations/instance",authenticate,instanceController.instanceReport);

//API router for observations entityReport
router.post("/observations/entity",authenticate,entityController.entityReport);

router.post("/observations/byEntity",authenticate,entityController.observationsByEntity);

//API router for observationReport
router.post("/observations/report",authenticate,observationController.observationReport);

//API router for listing all the observation Names
router.post("/observations/listObservationNames",authenticate,listObservationNames.listObservationNames)

//API router for listing all the solution Names
router.post("/observations/listObservationSolutions",authenticate,listObservationSolutions.listObservationSolutions)

//API router for getting observation submission count
router.post("/observations/submissionsCount",authenticate,observationSubmissions.observationSubmissionsCount)

//API router for observation report (cluster/block/district)
router.post("/observations/entityObservationReport",authenticate,entityController.entityObservationReport)

//API router for solution report (cluster/block/district)
router.post("/observations/entitySolutionReport",authenticate,entitySolutionCOntroller.entitySolutionReport)

//API router for instance observation score report
router.post("/observations/instanceObservationScoreReport",authenticate,instanceController.instanceObservationScoreReport)

//API router for entity observation score report
router.post("/observations/entityScoreReport",authenticate,entityController.entityObservationScoreReport)

//API router observation score report
router.post("/observations/scoreReport",authenticate,observationController.scoreReport)

//API router entity solution score report
router.post("/observations/entitySolutionScoreReport",authenticate,entityController.entitySolutionScoreReport)

//API router for list programs (Assessment)
router.post("/assessments/listPrograms",authenticate,listAssessmentPrograms.listPrograms);

//API router for Assessment Report 
router.post("/assessments/entity",authenticate,entityAssessController.entityAssessment);

//API for observation PDF generation
router.get("/observations/pdfReports",authenticate,pdfController.observationPdfReports);

//API for observations PDF ( For internal use)
router.get("/observations/pdfReportsUrl",pdfController.pdftempUrl);

//API router for observation score PDF report
router.post("/observations/observationScorePdfReport",authenticate,pdfController.observationScorePdfReport)

//API for Assessment PDF
router.post("/assessment/pdfReports",authenticate,entityAssessController.assessmentPdfReport);


//API for Unnati app PDF generation 
router.post("/unnati/pdfReport",authenticate,pdfController.unnatiPdfGeneration)


//========= API calls for container app=============

//API for course enrollment
router.post("/shikshalokam/courseEnrollment",authenticate,course_enrollment.courseEnrollment);

//API for content view
router.get("/shikshalokam/contentView",authenticate,content_view.contentView);

//API for content view by user
router.post("/shikshalokam/contentDownloadedByUser",authenticate,content_view.contentDownloadedByUser);

//API for content view by user
router.get("/shikshalokam/usageByContent",authenticate,content_view.usageByContent);


function authenticate(req,res,next){

    authService.validateToken(req,res)
    .then(function (result) {

        if(result.status=="success"){

            req.body.userId = result.userId;
            next();
        } else {
            res.send({ status:"failed",message:result.message })
        }


    });

}


module.exports = router;