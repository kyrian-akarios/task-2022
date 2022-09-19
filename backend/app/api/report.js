/**
 * @api - Report
 * @description - Report API - provides report functions
 */

/** DECLARATIONS */
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose();
const db = require('../services/DatabaseReader')
const handle = db.getInstance();
const Validator = require('../services/Validator')
const ReportBuilder = require('../services/ReportBuilder')
/**
 * @route - report
 * @description - takes information and returns a report file
 */
router.post('/report', (req,res)=>{
    let details = JSON.parse(req.body.details)
    let file = ReportBuilder.buildReport(details.personal_details, details.assessment_details, details.school_details)
    return res.status(200).send(file)
})

module.exports = router