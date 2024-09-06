console.log("Client-side JavaScript is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    const location = search.value;

    // Set loading message before the request
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    // Make sure the location is not empty
    if (!location) {
        messageOne.textContent = "Please enter a location!";
        return;
    }

    // Fetch the weather data using the inputted location
    fetch(`http://localhost:3006/weather?address=${encodeURIComponent(location)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = "";
                messageTwo.textContent = data.error;
            } else {
                messageOne.textContent = `Location: ${data.foreCastData.location}`;
                messageTwo.textContent = `Weather Forecast: ${data.foreCastData.weatherForCast}`;
            }
        })
        .catch((error) => {
            // Handle network or fetch errors
            messageOne.textContent = "Unable to fetch weather data.";
            messageTwo.textContent = error.message;
        });
});
