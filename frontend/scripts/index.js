
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
    request.onload = function(){
        data = JSON.parse(this.response);
        let options = document.getElementById('search-options')
        options.innerHTML = ''
        for(item of data.pupils){
            createSearchOptions(item.Firstname, item.Surname)
        }
        setupOptions()

    }
}

function createSearchOptions(firstname, surname){
    let options = document.getElementById('search-options')
    let new_p = document.createElement("p");
    let new_text = document.createTextNode(`${firstname}, ${surname}`)
    new_p.appendChild(new_text)
    options.appendChild(new_p)

}

function setupSearch(){
    let search = document.getElementById('search')
    search.addEventListener('change',(e)=>{
        console.log(e.target.value)
        makeRequest(`http://localhost:3000/api/pupils/search?name=${e.target.value}`, e.target.value)

    })

}

function setupOptions(){
    let search = document.getElementById('search')
    let options = document.getElementById('search-options')
    for(option of options.children){
        option.addEventListener('click', (e)=>{
            search.value = e.target.innerText
        })

    }
}

function search(firstname){

}

initialize()