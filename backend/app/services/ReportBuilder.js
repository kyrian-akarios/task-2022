/**
 * @class - ReportBuilder
 * @description - builds report using jsPDF
 */
const {jsPDF} = require('jspdf')

class ReportBuilder{
    static buildReport(personal_details, assessment_details, school_details){
        const doc = new jsPDF();
        doc.text("Report", 10,10);
        doc.text(personal_details.name, 10, 20);
        doc.text("Gender", 10, 25);
        doc.text(personal_details.gender, 40, 25);
        doc.text("Year", 10, 40);
        doc.text(personal_details.year, 40, 40);
        return doc.output('datauristring')
    }
}

module.exports = ReportBuilder