var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC9b7MUs4fWFi4yXj1_JAdTIiB9nrexpx4",
    authDomain: "socialspend-test.firebaseapp.com",
    databaseURL: "https://socialspend-test.firebaseio.com",
    projectId: "socialspend-test",
    storageBucket: "socialspend-test.appspot.com",
    messagingSenderId: "1064956290480"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function writeUserData(id, transactions) {
    firebase.database().ref('users/' + id).set({
        transactions: transactions
    });
}

// returns a Promise
function readUserData(id){
    return firebase.database().ref('/users/' + id).once('value').then(function(snapshot) {
        var transactions = snapshot.val().transactions;
        return transactions
    });
}

function updateUserData(id, newTransactions){
    let update = {}
    update['/users/' + id] = {
        transactions: newTransactions
    }
    firebase.database().ref().update(update);
}

function addNewTransaction(id, newTransaction){
    readUserData(id).then(function(results){
        console.log(results)
        results.push(newTransaction)
        updateUserData(id, results)
    })
}

/*
writeUserData(0, {
    0: "Purchase0 stuff",
    1: "Purchase1 stuff"
})
*/
addNewTransaction(0, "Purchase7 stuff")