/**
 * @api - pupils
 * @description - Pupils API - provides search functions for homepage and other data
 */

/** DECLARATIONS */
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const sqlite = require('sqlite')

/**
 * @route - /students
 * @description - gets the search data
 */
router.get('/students', (req,res)=>{
    return res.json({
        test:true
    })
})

/**
 * @route = /students/search
 * @description - gets a student associated with a name
 */


module.exports = router
