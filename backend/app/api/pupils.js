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
 * @route - /pupils/searchById
 * @description - returns the ID matched by the name of the student
 */
router.get('/pupils/searchById', (req,res)=>{
    let name = req.query.name
    console.log(name)
    handle.all(`SELECT ID FROM pupils WHERE Firstname LIKE '${name}%'`, (err,rows)=>{
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
