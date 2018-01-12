const request = require('request')

const apiKey = "AIzaSyB6P2_7QIdwiDtTnX7_BTjAEbXI8nEfGTU"
const placeId = "ChIJmXMR0ym0t4kRNT_fHDYv6xg" 
const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=" + apiKey

request.get(url, (err, res, body) => {
    if(err){
        console.log(err)
    }else{
        let result = JSON.parse(body)
        console.log(result['result']['reviews'][0]['text'])
    }
})