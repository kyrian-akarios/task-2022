/**
 * @api - data
 * @description - Data API - provides visualziation functions
 */

/** DECLARATIONS */
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose();
const db = require('../services/DatabaseReader')
const handle = db.getInstance()
const Validator = require('../services/Validator')

/**
 * @route - data
 * @description - gets data from PupilID and returns assessment information 
 */
router.get('/data', (req,res)=>{
    let pupil_id = req.query.pupil_id
    if(!Validator.validatePupilID(pupil_id)){
        return res.status(400).json({message:"Sorry, your fields are invalid", error:true})
    }
    handle.all(`SELECT AssessmentYear, AssessmentTerm, StatementID FROM data WHERE PupilID = '${pupil_id}'`, (err,rows)=>{
        if(err){
            res.status(500).json({message:"Sorry, something went wrong."});
        }
        else{
            let data = []
            rows.forEach(row=>{
                data.push(row)
            })
            res.status(200).json({data:data,message:"Success!"});
        }
    })
})



module.exports = router
