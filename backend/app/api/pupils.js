/**
 * @api - pupils
 * @description - Pupils API - provides search functions for homepage and other data
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
 * @route - /pupils
 * @description - gets the search data
 */
router.get('/pupils', (req,res)=>{
    handle.all("SELECT Firstname, Surname FROM pupils", (err,rows)=>{
        if(err){
            res.status(400).json({message:"Sorry, something went wrong."});
        }
        else{
            let pupils = []
            rows.forEach(row=>{
                pupils.push(row)
            })
            res.status(200).json({pupils:pupils,message:"Success!"});
        }
    })

})

/**
 * @route = /pupils/search
 * @description - gets a student associated with a name
 */
router.get('/pupils/search', (req,res)=>{
    let name = req.query.name
    console.log(name)
    handle.all(`SELECT Firstname, Surname FROM pupils WHERE Firstname LIKE '${name}%'`, (err,rows)=>{
        if(err){
            res.status(500).json({message:"Sorry, something went wrong."});
        }
        else{
            let pupils = []
            rows.forEach(row=>{
                pupils.push(row)
            })
            res.status(200).json({pupils:pupils,message:"Success!"});
        }
    })
})

/**
 * @route - /pupils/searchByName
 * @description - returns the ID matched by the name of the student
 */
router.get('/pupils/searchByName', (req,res)=>{
    let first_name = req.query.first_name.trim()
    let surname = req.query.surname.trim()
    if(!Validator.validateName(first_name) || !Validator.validateName(surname)){
        res.status(400).json({message:"Sorry, your fields are invalid.", error:true})
    }
    handle.all(`SELECT ID, SchoolID, Gender, Ethnicity, YearReal, DateOfBirth FROM pupils WHERE Firstname = '${first_name}' AND Surname = '${surname}'`, (err,rows)=>{
        if(err){
            res.status(500).json({message:"Sorry, something went wrong."});
        }
        else{
            let pupils = []
            rows.forEach(row=>{
                pupils.push(row)
            })
            res.status(200).json({pupils:pupils,message:"Success!"});
        }
    })
})

module.exports = router
