/**
 * @testsuite - API Tests
 * @description - testing the api components of the backend
 */

 var assert = require('assert')
 const express = require('express')
 const app = express()
 const axios = require('axios')

 /**
  * @test - Pupils API
  * @expected - status 200
  */
 describe('Pupils API', ()=>{
    describe('#/', ()=>{
        it('should return a set of pupils from the database.', ()=>{
            axios.get('http://localhost:3000/api/pupils')
            .then(res=>{
                assert.equal(res.status, 200);
            })
        })
    })
    describe('#/search', ()=>{
        it('should return a set of pupils matching the name', ()=>{
            axios.get('http://localhost:3000/api/pupils/search', {
                first_name:'Maisie'
            })
            .then(res=>{
                assert.equal(res.status, 200)
            }) 
        })
    })
    describe('#/searchByName', ()=>{
        it('should return a set of information from the database', ()=>{
            axios.get('http://localhost:3000/api/pupils/searchByName',{
                first_name:'Maisie',
                surname:'Hussain'    
            })
            .then(res=>{
                assert.equal(res.status, 200)
            })
        })
    })
 })


