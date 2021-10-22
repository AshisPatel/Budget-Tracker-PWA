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
    db.createObjectStore('prev_transactions', { autoIncrement: true });
};

// upon a succesfull connection to the database, re-save our connection and upload data to the server
request.onsuccess = function(event) {
    // Saving the global variable to now reference the 'budget_tracker' db
    db = event.target.result; 

    // check if the app is online, and if it is upload data
    if (navigator.onLine) {
        uploadTransaction();
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

function uploadTransaction() {
    // open a transaction connection to the db (not constantly connected, need to to do this everytime we interact with the db);
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    // access the object store
    const transactionObjectStore = transaction.objectStore('new_transaction');

    // get all the records that are currently in the store
    // getAll() is an async method, thus we must use eventhandlers to see when it completes and if they are succesfull
    const getAllTransactions = transactionObjectStore.getAll();

    // upon getAll() succesfully executing run the following code...
    getAllTransactions.onsuccess = function() {
        // If the getAll() object contains any data, send a post request to our database to add new data
        if (getAllTransactions.result.length > 0) {
            fetch("/api/transaction", {
                method: "POST",
                body: JSON.stringify(getAllTransactions.result),
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json"
                }
              })
              .then(response => response.json())
              .then(serverResponse => {
                  if(serverResponse.message) {
                    throw new Error(serverResponse); 
                  }
                //   if server succesfully responds, open another transaction to clear out all of data from our object store now that it has been added to the server's database
                const transaction = db.transaction(['new_transaction'], 'readwrite');
                const transactionObjectStore = transaction.objectStore('new_transaction');
                transactionObjectStore.clear();

                alert('You are back online, all your offline data has been submitted to the server!');
              })
              .catch(err => console.log(err) );
        }
    }
}

const saveOldTransactions = (data) => {
    // Remove any old data
    const transaction = db.transaction(['prev_transactions'], 'readwrite');
    const pTransactionsObjectStore = transaction.objectStore('prev_transactions');
    const clearData = pTransactionsObjectStore.clear();
    // all latest transactions list
    clearData.onsuccess = function() {
        const transaction = db.transaction(['prev_transactions'], 'readwrite');
        const pTransactionsObjectStore = transaction.objectStore('prev_transactions');
        pTransactionsObjectStore.add(data);
    };
    
}

const getOldTransactions = async () => {
    let dataToSend; 
    const transaction = db.transaction(['prev_transactions'], 'readwrite');
    const pTransactionsObjectStore = transaction.objectStore('prev_transactions');

    const getData = pTransactionsObjectStore.getAll();

    getData.onsuccess = () => {
       return dataToSend = getData.result; 
    }
    
}

// Listen for when the website goes back online and add offline data
window.addEventListener('online', uploadTransaction);
    

    
