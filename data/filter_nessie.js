const request = require('request')

const apiKey = 'ee484fbe1e05ac04d41cc3885e152856'
const dataToObtain = 'accounts/5a563d205eaa612c093b0b4f/purchases'
const url = 'http://api.reimaginebanking.com/' + dataToObtain + '?key=' + apiKey

request.get(url, (err, res, body) => {
    if(err){
        console.log(err)
    }else{
        let result = JSON.parse(body)
        console.log(result)
    }
})

/*
    Customers' IDs

    5a563d205eaa612c093b0b46
    5a563d205eaa612c093b0b4e
    5a563d215eaa612c093b0b4f
*/