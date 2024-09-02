const getForeCast = async(latitude, longitude, callback)=>{

    const foreCastURL = `https://api.weatherstack.com/current?access_key=50900a6ad753bd8d6592e4454c152933&query=${latitude},${longitude}&units=f`

    const response = await fetch(foreCastURL)

    const body = await response.json()

        if(!response){
            callback("Unable to connect weather service", undefined)
        }else if(body.error){
            callback("Unable to find the location", undefined)
        }else{
           
            callback(undefined, {
                location: body.location.name +", "+body.location.country,
                weatherForCast: `${body.current. weather_descriptions} until evening. It is currently ${ body.current.temperature} degrees out. There is ${body.current.feelslike} chance for rain`
            })
        }

}

module.exports = {
    getForeCast: getForeCast
}