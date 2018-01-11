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
    firebase.database().ref('users/' + id).set(transactions);
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

/*
writeUserData('1839402344', {
    "Starbucks":{
        "2017-29-09-08:15": 12,
        "2018-19-01-12:34": 86
    },
    "Panera": {
        "2017-29-09-08:15": 13,
        "2018-19-01-12:34": 67
    }
})

updateUserData('1839402344', {
    "Giant":{
        "2017-29-09-08:15": 42,
        "2018-19-01-12:34": 23
    },
    "Pharmacy": {
        "2017-29-09-08:15": 4,
        "2018-19-01-12:34": 61
    }
})

readUserData('1839402344').then(function(results){
    console.log(results)
})

addNewTransaction('1839402344', 'Sotre', {
    "2017-29-09-08:15": 4,
    "2018-19-01-12:34": 61
})
*/