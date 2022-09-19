/**
 * @testsuite - API Tests
 * @description - testing the api components of the backend
 */

 var assert = require('assert')
 const express = require('express')
 const app = express()
 const axios = require('axios')

 /**
  * @test - Statements API
  * @expected - status 200
  */
 describe('Statements API', ()=>{
    describe('#/', ()=>{
        it('should return a set of statements from the database.', ()=>{
            axios.get('http://localhost:3000/api/statements')
            .then(res=>{
                assert.equal(res.status, 200);
            })
        })
    })
    
 })


