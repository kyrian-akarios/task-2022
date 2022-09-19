/**
 * @api - schools
 * @description - Schools API - provides school functions
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

/**
 * @route - schools
 * @description - takes school ID and returns the name of the school
 */
router.get('/schools', (req,res)=>{
    let school_id = req.query.school_id
    if(!Validator.validateSchoolID(school_id)){
        res.status(400).json({message:"Sorry, your fields are invalid", error:true})
    }
    handle.all(`SELECT SchoolName FROM schools WHERE schoolcode = '${school_id}'`, (err,rows)=>{
        if(err){
            res.status(500).json({message:"Sorry, something went wrong."});
        }
        else{
            let results = []
            rows.forEach(row=>{
                results.push(row)
            })
            res.status(200).json({results:results,message:"Success!"});
        }
    })
})

module.exports = router