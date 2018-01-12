const request = require('request')

const apiKey = "AIzaSyB6P2_7QIdwiDtTnX7_BTjAEbXI8nEfGTU"
const placeId = "ChIJQ2p5wIW2t4kRPRCmMyKuF-Y" 
const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=" + apiKey

request.get(url, (err, res, body) => {
    if(err){
        console.log(err)
    }else{
        let result = JSON.parse(body)
        console.log(result)
    }
})