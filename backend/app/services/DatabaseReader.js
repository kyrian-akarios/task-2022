const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
/**
 * @class - DatabaseReader
 * @description - reads in data from database and returns
 */
class DatabaseReader{
    _db
    static connect(){
        const db = sqlite.open({
            filename:'C:\\Users\\User\\Desktop\\Projects\\task-2022\\backend\\database\\database.sqlite',
            driver:sqlite3.Database
        })
        .then(()=>{
            this._db = db
        })
        return true
    }

    static getAllStudents(){

    }

    static searchStudents(name){

    }

    static close(){
        this._db = null;
    }

    

}

module.exports = DatabaseReader

