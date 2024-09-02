

const getCoordinates = async(address, callback)=>{

    const geocodingURL = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=66d28fab4d64b678943629tpx693d4f`
    
        const response = await fetch(geocodingURL)
        const body = await response.json()

        if(!response){
            callback("Unable to connect weather service", undefined)
        }else if(!body[0]){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined,{
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            })
        }
    
}


module.exports = {
    getCoordinates:getCoordinates
}