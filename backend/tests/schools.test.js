/**
 * @testsuite - API Tests
 * @description - testing the api components of the backend
 */

 var assert = require('assert')
 const express = require('express')
 const app = express()
 const axios = require('axios')

 /**
  * @test - schools API
  * @expected - status 200
  */
 describe('Schools API', ()=>{
    describe('#/', ()=>{
        it('should return a set of schools from the database.', ()=>{
            axios.get('http://localhost:3000/api/schools')
            .then(res=>{
                assert.equal(res.status, 200);
            })
        })
    })
    
 })


