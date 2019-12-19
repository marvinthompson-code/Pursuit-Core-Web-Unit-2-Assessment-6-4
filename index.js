document.addEventListener("DOMContentLoaded", async () => {
    let img = document.querySelector("img")
    let select = document.querySelector("select")
    let movieInfoDiv = document.querySelector("#movieInfo")
    let reviews = document.querySelector("#submittedReviews")
    let form = document.querySelector("form")
    let userInput = document.querySelector("#userInput")

    try {
        let data =  await axios.get(`https://ghibliapi.herokuapp.com/films`)
        let films = data.data 
        // let filmID = data.data.id

        movieInfoDiv.innerHTML = ""
        let title = document.createElement("h3")
        let releaseYear = document.createElement("p")
        releaseYear.id = "releaseYear"
        let description = document.createElement("p")
        description.id = "description"

        const populateSelect = () => {
            films.forEach((film) => {
                let option = document.createElement("option")
                option.innerText = film.title
                select.appendChild(option)                
            })
            select.addEventListener("change", (e) => {
                title.innerText = e.target.value
                films.forEach((film) => {
                    if (film.title == title.innerText) {
                        releaseYear.innerText = film.release_date
                        description.innerText = film.description
                        movieInfoDiv.appendChild(title)
                        movieInfoDiv.appendChild(releaseYear)
                        movieInfoDiv.appendChild(description)

                        form.addEventListener("submit", (e) => {
                            e.preventDefault()
                            // reviews.innerHTML = ""
                            let li = document.createElement("li")
                            li.innerText = `${film.title}: ${userInput.value}`
                            userInput.value = ""
                            reviews.appendChild(li)
                        })
                    }
                })
            })
        }
        populateSelect()

        // form.addEventListener("submit", (e) => {
        //     e.preventDefault()
        //     reviews.innerHTML = ""
        //     let li = document.createElement("li")
        //     li.innerText = userInput.value
        //     reviews.appendChild(li)
        // })



    } catch (error) {
        
    }

  
    // THE FORM SHOULD BE FOR SUBMITTING THE REVIEWS. CREATE A UL AND EACH FILM SHOULD BE AN LI WITH THE TITLE IN BOLD, SO MAYBE AN H3 OR SOMETHING



    
})