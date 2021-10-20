let db; 
// Connect to IndexedDB database called 'budget-tracker' and set the version number to 1. 

// Adding a listener for when the database needs to be accessed or created 
// If we ever have to add more information that is formatted differently (like we need a new column of data, etc)
// We can update the version number to imply that the database needs to be recreated 
const request = indexedDB.open('budget_tracker', 1);

// Add an evenit that will emit if the database version changes (from either being nonexistent to v1, etc)
request.onupgradeneeded = function(event) {
    // save that the db is referenced -> since we are looking at "request" and request is our DB called 'budget_tracker'
    // the db variable is being set equal to the target of our event, which is 'budget_tracker'
    const db = event.target.result; 
    // creating a 'store' where the data is held in IndexedDB (like an SQL table or MongoDB collection)
    // this 'store' will be named 'new_transaction' and store our entries with autoincrementing ID's (similair to MySQL)
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// upon a succesfull connection to the database, re-save our connectionand upload data to the server
request.onsuccess = function(event) {
    // Saving the global variable to now reference the 'budget_tracker' db
    db = event.target.result; 

    // check if the app is online, and if it is upload data
    if (navigator.onLine) {
        // uploadTransactions();
    }
};

// Upon running into an error connecting to the db, console log the error
request.onerror = function(event) {
    console.log(event.target.errorCode);
}

// Function to open a connection to the store and add data
// data is being passed in from a failed fetch request as 'record'
function saveRecord(record) {
    // Open a new connection to the 'new_transaction' store with readwrite privelages
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // access the object store 
    const transactionObjectStore = transaction.objectStore('new_transaction');

    // add record to the store 
    transactionObjectStore.add(record); 

}