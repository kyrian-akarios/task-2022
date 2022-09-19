/**
 * @block - initializeElements
 * @description - initializes elements so that they are available on a global scale
 */
let name_field = document.getElementById("name")
let gender_field = document.getElementById("gender")
let ethnicity_field = document.getElementById("ethnicity")
let year_field = document.getElementById("year")
let dob_field = document.getElementById("date_of_birth")
let ay_field = document.getElementById("assessment_year");
let at_field = document.getElementById("assessment_term");
let statement_field = document.getElementById("statements")
let school_field = document.getElementById("school_name");



/**
 * @function - initialize
 * @description - initializes the page
 */
function initialize(){
    let report_button = document.getElementById("report-button")
    report_button.addEventListener('click', generateReport)
    getInformation()
    createChart('chart')
    createChart('chart2')
    createChart('chart3')
}

/**
 * @function - get Information
 * @description - gets information from multiple API endpoints to build the page
 * queries name to get ID, then uses that to query all other information pertaining to that
 * pupil ID
 */
function getInformation(){
    const params = new URLSearchParams(window.location.search)
    let search = params.get('search')
    let first_name = search.split(",")[0]
    let surname = search.split(",")[1]
    let request = new XMLHttpRequest()
    let pupil_id 
    let school_id
    let gender 
    let ethnicity 
    let year 
    let date_of_birth
    try{
        request.open('GET', `http://localhost:3000/api/pupils/searchByName?first_name=${first_name}&surname=${surname}`)
        request.send()
        request.onerror = function(){
            let error = document.getElementById("error")
            error.style.display = "flex";
        }
        request.onload = function(){
            data = JSON.parse(this.response);
            console.log(data)
            pupil_id = data.pupils[0].ID
            school_id = data.pupils[0].SchoolID
            gender = data.pupils[0].Gender
            ethnicity = data.pupils[0].Ethnicity 
            year = data.pupils[0].YearReal
            date_of_birth = data.pupils[0].DateOfBirth
            fillPupilInformation(first_name, surname, gender, ethnicity, year, date_of_birth)
            
            let second_request = new XMLHttpRequest()
            second_request.open('GET', `http://localhost:3000/api/data?pupil_id=${pupil_id}`)
            second_request.send()
            second_request.onload = function(){
                data = JSON.parse(this.response)
                let statement_ids = []
                let assessment_year = data.data[0].AssessmentYear
                let assessment_term = data.data[0].AssessmentTerm
                let statement_id = data.data.forEach(data=> statement_ids.push(data.StatementID));
                fillAssessmentInformation(assessment_term, assessment_year)
                third_request = new XMLHttpRequest();
                third_request.open('GET', `http://localhost:3000/api/schools?school_id=${school_id}`)
                third_request.send()
                third_request.onload = function(){
                    data = JSON.parse(this.response)
                    console.log(data)
                    let school_name = data.results[0].schoolName
                    fillSchoolInformation(school_name)
                }
             
                let fourth_request = new XMLHttpRequest();
                fourth_request.open('POST', 'http://localhost:3000/api/statements')
                fourth_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
                fourth_request.send("statement_ids="+JSON.stringify(statement_ids))
                fourth_request.onload = function(){
                    data = JSON.parse(this.response)
                    for(row of data.results){
                        fillStatementInformation(row.Statement)
                    }
                    
                }
            }
        }
    }
    catch(e){
        let error = document.getElementById("error")
        error.style.display = "flex";

    }
}
    
    

/**
 * @function - fillPupilInformation
 * @description - fills in information from the Pupils API into the DOM doc 
 * @param {string} first_name 
 * @param {string} surname 
 * @param {string} gender 
 * @param {string} ethnicity 
 * @param {date} year 
 * @param {date} date_of_birth 
 */
function fillPupilInformation(first_name, surname, gender, ethnicity, year, date_of_birth){
    name_field.innerHTML = first_name + surname
    gender_field.innerHTML = gender
    ethnicity_field.innerText = ethnicity
    year_field.innerText = year
    dob_field.innerText = date_of_birth

}
/**
 * @function - fillAssessmentInformation
 * @description - fills in information from assessment API into the DOM 
 * @param {string} assessment_term 
 * @param {date} assessment_year 
 */
function fillAssessmentInformation(assessment_term, assessment_year){
    at_field.innerHTML = assessment_term;
    ay_field.innerHTML = assessment_year;
}
/**
 * @function - fillSchoolInformation
 * @description - fills in information from SChool API into the DOM
 * @param {string} school_name 
 */
function fillSchoolInformation(school_name){
     school_field.innerHTML = school_name;
}
/**
 * @function - fillStatementInformation
 * @description - fills in information from Statement API intot he DOM
 * @param {string} statement 
 */
function fillStatementInformation(statement){
    if(statement != ""){
        let new_tr = document.createElement("tr")
        let new_td = document.createElement("td")
        let new_statement = document.createTextNode(statement)
        new_td.appendChild(new_statement)
        new_tr.appendChild(new_td)
        statement_field.appendChild(new_tr)

    }


}
/**
 * @function - createChart
 * @description - leverages the Google Charts API to create a chart from given data.
 * @param {string} chart_name 
 */
function createChart(chart_name){
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(()=>{
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Grade');
        data.addColumn('number', 'Points');
        data.addRows([
        ['English', 4],
        ['Maths', 5],
        ['Science', 5],
        ['History', 6],
        ['Computer Science', 8],
        ['Geography', 7],
        ['Product Design', 1]
        ]);

        var options = {'title':'Grade',
                        'width':300,
                        'height':300};

        var chart = new google.visualization.BarChart(document.getElementById(chart_name));
        chart.draw(data, options);
      });
}

/**
 * @function - generateReport
 * @description - sends a request to generate a pdf file report
 */
function generateReport(){
    let personal_details = {
        name:name_field.innerText,
        gender:gender_field.innerText,
        ethnicity:ethnicity_field.innerText,
        year:year_field.innerText,
        dob:dob_field.innerText
    }
    let assessment_details = {
        assessment_term:at_field.innerText,
        assessment_year:ay_field.innerText
    }
    let school_details = {
        school_name:school_field.innerText
    }
    let file_request = new XMLHttpRequest();
    file_request.open('POST', 'http://localhost:3000/api/report')
    file_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    file_request.send("details="+JSON.stringify({personal_details, assessment_details, school_details}))
    file_request.onerror=err=>{
        let error = document.getElementById("error")
        error.style.display = "flex";
        error.lastElementChild.innerText = "Sorry - unable to generate your report at the moment."
    }
    file_request.onload= function(){
        window.open(this.response, '_blank')
    }

}



initialize()
