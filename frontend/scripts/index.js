
/**
 * @function - initalize
 * @description - initializes the page by calling other functions
 */
function initialize(){
    setupSearch()
    makeRequest('http://localhost:3000/api/pupils')
}

/**
 * @function - makeRequest
 * @description - generic method to create requests to send
 */
function makeRequest(url){
    let request = new XMLHttpRequest()
    request.open('GET', url)
    request.send()
    request.onerror=(err)=>{
        let error = document.getElementById("error")
        error.style.display = "flex";
    }
    request.onload = function(err){
        if(err) console.log(err)
        data = JSON.parse(this.response);
        let options = document.getElementById('search-options')
        options.innerHTML = ''
        for(item of data.pupils){
            createSearchOptions(item.Firstname, item.Surname)
        }
        setupOptions()

    }
}
/**i 
 * @function - createSearchOptions
 * @description - takes in first/surname and appends to search options
 * @param {string} firstname 
 * @param {string} surname 
 */
function createSearchOptions(firstname, surname){
    let options = document.getElementById('search-options')
    let new_p = document.createElement("p");
    let new_text = document.createTextNode(`${firstname}, ${surname}`)
    new_p.appendChild(new_text)
    options.appendChild(new_p)

}
/**
 * @function - setupSearch
 * @description - sets up search event listeners
 */
function setupSearch(){
    let search = document.getElementById('search')
    search.addEventListener('change',(e)=>{
        console.log(e.target.value)
        makeRequest(`http://localhost:3000/api/pupils/search?name=${e.target.value}`, e.target.value)

    })

}
/**
 * @function - setupOptions
 * @description - sets up event listeners for options
 */
function setupOptions(){
    let search = document.getElementById('search')
    let options = document.getElementById('search-options')
    for(option of options.children){
        option.addEventListener('click', (e)=>{
            search.value = e.target.innerText
        })

    }
}


initialize()