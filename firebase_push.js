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
function readUserData(id){
    return firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        var transactions = snapshot.val();
        return transactions
    });
}

function updateUserData(id, newTransactions){
    let update = {}
    update['/users/' + id] = newTransactions
    firebase.database().ref().update(update);
}

function deleteUserData(id){
    let update = {}
    update['/users/' + id] = null
    firebase.database().ref().update(update);
}

function addNewTransaction(id, attr, newTransaction){
    readUserData(id).then(function(results){
        console.log(results)
        results[attr] = newTransaction
        updateUserData(id, results)
    })
}

// put dummy data on firebase
const dummy_data = require('./dummy_data.js').dummy_data
writeUserData(dummy_data)