console.log("Client side java script is loaded!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

messageOne.textContent = ""

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    fetch(`http://localhost:3001/weather?address=${location}`)
        .then((response) => {
            
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = "Loading ..."
                    console.log(data.error)
                    messageOne.textContent = ""
                    messageTwo.textContent = data.error
                } else {
                    messageOne.textContent = "Loading ..."
                    console.log(data.foreCastData)
                    messageOne.textContent = data.foreCastData.location
                    messageTwo.textContent = data.foreCastData.weatherForCast
                }
            })
        })

})