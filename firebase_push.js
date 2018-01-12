var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJKvhuv1aLwLu2dfeLxzGlPnkvaV1koAk",
    authDomain: "socialspend-191815.firebaseapp.com",
    databaseURL: "https://socialspend-191815.firebaseio.com",
    projectId: "socialspend-191815",
    storageBucket: "socialspend-191815.appspot.com",
    messagingSenderId: "327321627172"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(transactions) {
    firebase.database().ref('users').set(transactions);
}

// returns a Promise
function readUserData(index){
    return firebase.database().ref('/users').once('value').then(function(snapshot) {
        var users = snapshot.val();
        return users[index]
    });
}

function updateUserData(index, newTransactions){
    let update = {}
    update['/users/'+index] = newTransactions
    firebase.database().ref().update(update);
}

function deleteUserData(index){
    let update = {}
    update['/users/' + index] = null
    firebase.database().ref().update(update);
}

function addNewTransaction(index, newTransaction){
    readUserData(index).then(function(results){
        results['transactions'].unshift(newTransaction)
        updateUserData(index, results)
    })
}

// put dummy data on firebase
const dummy_data = require('./dummy_data.js').dummy_data
writeUserData(dummy_data)

//deleteUserData(1)

/*
addNewTransaction(1, {
    store: "Giant Food",
    amount: 10.52,
    time: "2018-01-12"
})
*/

//clear()
function clear(){
    for (let i = 0; i < dummy_data.length ; i++){
        deleteUserData(i)
    }
}