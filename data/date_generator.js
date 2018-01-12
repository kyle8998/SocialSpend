let yyyy = Math.floor(Math.random() * 2 ) + 2017
let mm = ("0" + Math.floor(Math.random() * 12 + 1)).slice(-2)
let dd = ("0" + Math.floor(Math.random() * 30 + 1 )).slice(-2) 
if(yyyy == 2018){
    mm = '01'
    dd = ("0" + Math.floor(Math.random() * 10 + 1)).slice(-2) 
}
console.log(yyyy + "-" + mm + "-" + dd)