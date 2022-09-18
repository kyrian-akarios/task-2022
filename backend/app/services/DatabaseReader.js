const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
/**
 * @object - db
 * @description - reads in data from database and returns
 */
class DatabaseReader{
    handle
    static getInstance(){
        return new sqlite3.Database('C:\\Users\\User\\Desktop\\Projects\\task-2022\\backend\\database\\database.sqlite');
    }
}


module.exports = DatabaseReader


