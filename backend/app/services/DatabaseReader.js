const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
/**
 * @object - db
 * @description - singleton instance that returns a Database connection
 */
class DatabaseReader{
    handle
    static getInstance(){
        if(this.handle){
            return this.handle
        }
        else{
            this.handle = new sqlite3.Database('../../backend/database/database.sqlite');
            return this.handle
        }
    }

    static close(){
        this.handle.close()
    }
}


module.exports = DatabaseReader


