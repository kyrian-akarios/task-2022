/**
 * @testsuite - API Tests
 * @description - testing the api components of the backend
 */

 var assert = require('assert')
 const express = require('express')
 const app = express()
 const axios = require('axios')

 /**
  * @test - Report API
  * @expected - status 200
  */
 describe('Report API', ()=>{
    describe('#/', ()=>{
        it('should return a data URI produced by jsPDF.', ()=>{
            axios.post('http://localhost:3000/api/report',{
                details:{
                    personal_details:{
                        name:'Simara Reynolds',
                        gender:'M',
                        ethnicity:'ADPK',
                        year:'6',
                        dob:'20190612'
                    },
                    assessment_details:{
                        assessment_term:'1',
                        assessment_year:'3'
                        
                    },
                    school_details:{
                        school_name:'School B'
                    }
                }

            })
            .then(res=>{
                assert.equal(res.status, 200);
            })
        })
    })
    
 })


