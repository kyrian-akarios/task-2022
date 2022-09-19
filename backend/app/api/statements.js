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
router.post('/statements', (req,res)=>{
    let statement_ids = JSON.parse(req.body.statement_ids)
 
    const stmt = handle.prepare(`SELECT STATEMENT FROM statements WHERE StatementID = (?)`)
    let result = []
    for(id of statement_ids){
        if(!Validator.validateStatementID(id)){
            res.status(400).json({message:"Sorry, your fields are invalid", error:true})
        }
        stmt.each(id, (err,row)=>{
            if(err) res.status(500).json({message:"Sorry, an error occurred, please try again later.", error:true})
            result.push(row)
        })
    }
    stmt.finalize(()=>{
        res.status(200).json({results:result, message:"Success!", success:true})
    })
})

module.exports = router