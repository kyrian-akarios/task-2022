const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path')
/**
 * @object - db
 * @description - singleton instance that returns a Database connection
 */
class DatabaseReader{
    handle
    static getInstance(){
        return new sqlite3.Database(path.resolve('backend/database','database.sqlite'));
    }
}


module.exports = DatabaseReader


