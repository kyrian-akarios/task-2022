/**
 * @testsuite - Setup Tests
 * @description - testing the set up components of the backend
 */

var assert = require('assert')
const express = require('express')
const app = express()
const db = require('../app/services/DatabaseReader')

/**
 * @test - DBConnection
 * @expected - it should connect to the database
 */
describe('Database', ()=>{
    describe('#connect()', ()=>{
        it('should return a database handle for SQLite.', ()=>{
            assert.doesNotThrow(db.getInstance())
        })
    })
})

/**
 * @test - App Connection
 * @expected - it should set the socket for the server to listening mode
 */
describe('Application', ()=>{
    describe('#listen()', ()=>{
        it('should open the socket for listening.', ()=>{
            assert.doesNotThrow(app.listen(3000))
        })
    })
    
})