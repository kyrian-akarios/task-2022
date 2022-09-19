

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
            statement_ids.forEach(id=>{
                let fourth_request = new XMLHttpRequest();
                fourth_request.open('GET', `http://localhost:3000/api/statements?statement_id=${id}`)
                fourth_request.send()
                fourth_request.onload = function(){
                    data = JSON.parse(this.response)
                    let statement = data.results[0].Statement
                    fillStatementInformation(statement)
                }

            })
        }
    }
    }
    catch(e){
        let error = document.getElementById("error")
        error.style.display = "block";

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
    let name_field = document.getElementById("name")
    let gender_field = document.getElementById("gender")
    let ethnicity_field = document.getElementById("ethnicity")
    let year_field = document.getElementById("year")
    let dob_field = document.getElementById("date_of_birth")
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
    let ay_field = document.getElementById("assessment_year");
    let at_field = document.getElementById("assessment_term");
    at_field.innerHTML = assessment_term;
    ay_field.innerHTML = assessment_year;
}
/**
 * @function - fillSchoolInformation
 * @description - fills in information from SChool API into the DOM
 * @param {string} school_name 
 */
function fillSchoolInformation(school_name){
    let school_field = document.getElementById("school_name");
    school_field.innerHTML = school_name;
}
/**
 * @function - fillStatementInformation
 * @description - fills in information from Statement API intot he DOM
 * @param {string} statement 
 */
function fillStatementInformation(statement){
    let statement_field = document.getElementById("statements")
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
        // Create the data table.
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
                        'width':400,
                        'height':300};

        var chart = new google.visualization.BarChart(document.getElementById(chart_name));
        chart.draw(data, options);
      });
}



createChart('chart')
createChart('chart2')
createChart('chart3')

getInformation()
