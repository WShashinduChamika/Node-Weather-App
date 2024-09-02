const request = require("request")

const getCoordinates = (address, callback)=>{

    const geocodingURL = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=66d28fab4d64b678943629tpx693d4f`
    
    request({url:geocodingURL, json:true}, (error, response)=>{
        if(error){
            callback("Unable to connect weather service", undefined)
        }else if(!response.body[0]){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined,{
                latitude: response.body[0].lat,
                longitude: response.body[0].lon,
                location: response.body[0].display_name
            })
        }
    })
}


module.exports = {
    getCoordinates:getCoordinates
}