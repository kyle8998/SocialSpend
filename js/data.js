//get customer from the nessi api
var url = "http://api.reimaginebanking.com/enterprise/accounts?key=fbb73b5276030cdd31167d80182e7d8b"



function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHTTP.responseType = 'json';
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var customers = httpGet(url);

console.log(customers);
