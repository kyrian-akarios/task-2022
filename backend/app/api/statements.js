/**
 * @api - statements
 * @description - Statements  API - provides statements functions
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
 * @route - statements
 * @description - queries database for statements through statement ID
 */
router.get('/statements', (req,res)=>{
    let statement_id = req.query.statement_id
    if(!Validator.validateStatementID(statement_id)){
        res.status(400).json({message:"Sorry, your fields are invalid", error:true})
    }
    handle.all(`SELECT Statement FROM statements WHERE StatementID = '${statement_id}'`, (err,rows)=>{
        if(err){
            res.status(500).json({message:"Sorry, something went wrong."});
        }
        else{
            let results = []
            rows.forEach(row=>{
                console.log(row)
                results.push(row)
            })
            res.status(200).json({results:results,message:"Success!"});
        }
    })
})

module.exports = router