/**
 * @class - Validator
 * @description - validates server-side params 
 */

class Validator{
    /**
     * @function - validateName
     * @description - ensures name is comprised only of alphabetical characters
     */
    static validateName(name){
        if(/[a-zA-Z]/.test(name)){
            return true;
        }
        return false;

    }
    /**
     * @function - validatePupilID
     * @description - validates pupilID through checking for alphanumeric characters and '-'
     */
    static validatePupilID(pupil_id){
        if(/[^#!"£$%^&*()]/){

        }
        return true;

    }
    /**
     * @function - validateSchoolID
     * @description - validates SchoolID through checking whether it's between 1 and 5
     */
    static validateSchoolID(school_id){
        if(/[0-9]/.test(school_id)){
            return true;
        }
        return false;

    }

    /**
     * @function - validateStatementID
     * @description - validates StatementID through checking for integers
     * 
     */
    static validateStatementID(statement_id){
        if(/[a-zA-Z0-9]/.test(statement_id)){
            return true;
        }
        return false;
    }
}

module.exports = Validator