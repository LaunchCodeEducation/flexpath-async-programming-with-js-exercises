/*
	Values to use for multiple exercises
*/

const section1OutputDiv = document.getElementById("section-1-output");
const section2OutputDiv = document.getElementById("section-2-output");

/*

  Exercise 1: Understanding Synchronous vs. Asynchronous Code

  Description:

  Write a function `syncFunction` that logs the numbers 1 to 3 synchronously.

  Then, write an `asyncFunction` that logs the numbers 1 to 3 asynchronously
  using setTimeout with a delay of 0.

  Observe the order of execution.
*/

// Exercise 1
function syncFunction() {
  console.log(1);
  console.log(2);
  console.log(3);
}

function asyncFunction() {
  setTimeout(() => console.log(1), 0);
  setTimeout(() => console.log(2), 0);
  setTimeout(() => console.log(3), 0);
}

console.log("Calling syncFunction:");
syncFunction();
console.log("Calling asyncFunction:");
asyncFunction();
console.log("End of script");
// Observed order: the synchronous 1, 2, 3 print first, then "End of script",
// and only then the asynchronous 1, 2, 3 - setTimeout callbacks always wait
// until the current synchronous code has finished, even with a delay of 0.

/*
  Exercise 2: Callback Function Example

  Description:

  Create a function `getDataCallback` that accepts a callback function.

  Use setTimeout to simulate fetching data asynchronously and then execute the
  callback with the data.

  Display the returned data in the #section-2-output div when the
  #exercise-2-btn is clicked.
*/

// Exercise 2
function getDataCallback(callback) {
  setTimeout(() => {
    const data = "Data fetched successfully!";
    callback(data);
  }, 1000);
}

document.getElementById("exercise-2-btn").addEventListener("click", () => {
  getDataCallback((data) => {
    section2OutputDiv.textContent = data;
  });
});

/*
  Exercise 3: The Callback Pyramid of Doom

  Description:

  Simulate multiple asynchronous operations using nested callbacks
  (at least 3 levels deep).

  Discuss how this leads to the "Callback Pyramid of Doom".
*/

// Exercise 3
function firstOperation(callback) {
  setTimeout(() => {
    console.log("First operation complete");
    callback();
  }, 1000);
}

function secondOperation(callback) {
  setTimeout(() => {
    console.log("Second operation complete");
    callback();
  }, 1000);
}

function thirdOperation(callback) {
  setTimeout(() => {
    console.log("Third operation complete");
    callback();
  }, 1000);
}

firstOperation(() => {
  secondOperation(() => {
    thirdOperation(() => {
      console.log("All operations complete");
    });
  });
});
// The "Callback Pyramid of Doom": each asynchronous step has to be nested
// inside the previous step's callback, so the code keeps indenting further
// and further to the right, forming a pyramid shape. As more steps are added
// the code becomes harder to read, harder to maintain, and error handling has
// to be repeated inside every level. Promises (Exercises 4-8) and async/await
// (Exercise 9) solve this by letting the same steps be written flat, in order.

/*
  Exercise 4: Creating a Promise

  Description:

  In the space below, rewrite the `getDataCallback` function from Exercise 2 to
  return a Promise instead of using a callback.

  Name it `getDataPromise`.

  Display the returned data in the #section-2-output div when the
  #exercise-4-btn is clicked.
*/

// Exercise 4 - Solution

// Exercise 4
function getDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = "Data fetched successfully!";
      resolve(data);
    }, 1000);
  });
}

document.getElementById("exercise-4-btn").addEventListener("click", () => {
  getDataPromise().then((data) => {
    section2OutputDiv.textContent = data;
  });
});

/*
  Exercise 5: Promise States

  Description:

  Explain the three states of a Promise:
    - pending
    - fulfilled
    - rejected

  Create a Promise that intentionally rejects to
  demonstrate the rejected state.
*/

// Exercise 5
// The three states of a Promise:
// - pending:   the initial state - the operation has not finished yet,
//              so the promise is neither fulfilled nor rejected.
// - fulfilled: the operation completed successfully and the promise
//              resolved with a value.
// - rejected:  the operation failed and the promise rejected with a reason
//              (usually an Error). A promise can only settle once - it moves
//              from pending to exactly one of fulfilled or rejected.

const intentionallyRejectedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Intentional rejection to demonstrate the rejected state"));
  }, 1000);
});

console.log("Promise just created (pending):", intentionallyRejectedPromise);

intentionallyRejectedPromise
  .then((value) => {
    console.log("Promise fulfilled with:", value);
  })
  .catch((error) => {
    console.error("Promise rejected:", error.message);
  });

/*
  Exercise 6: Consuming Promises with then, catch, and finally

  Description:

  Modify the `getDataPromise` method from exercise 4 to include a
  `finally` block that logs "Operation completed" regardless of
  success or failure.

  - getDataPromise().then().catch().finally()
*/

// Exercise 6
getDataPromise()
  .then((data) => {
    console.log("Exercise 6 data:", data);
  })
  .catch((error) => {
    console.error("Exercise 6 error:", error);
  })
  .finally(() => {
    console.log("Operation completed");
  });

/*
  Exercise 7: Chaining Promises

  Description:

  Create a function `processData` that returns a Promise.

  Chain it after getDataPromise to process the fetched data.

  Display the returned data in the #section-2-output div when the
  #exercise-7-btn is clicked.
*/

// Exercise 7
function processData(data, simulateError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Error processing data"));
      } else {
        resolve(data.toUpperCase());
      }
    }, 500);
  });
}

document.getElementById("exercise-7-btn").addEventListener("click", () => {
  getDataPromise()
    .then((data) => processData(data))
    .then((processedData) => {
      section2OutputDiv.textContent = processedData;
    })
    .catch((error) => {
      console.error("Error in promise chain:", error);
    });
});

/*
  Exercise 8: Handling Errors in Promise Chains

  Description:

  Modify the chain from Exercise 7 to handle errors that may occur in `processData`.

  Simulate an error and ensure it is caught and logged.

  Display the returned data in the #section-2-output div when the
  #exercise-8-btn is clicked.
*/

// Exercise 8
document.getElementById("exercise-8-btn").addEventListener("click", () => {
  getDataPromise()
    .then((data) => processData(data, true)) // true = simulate an error
    .then((processedData) => {
      section2OutputDiv.textContent = processedData;
    })
    .catch((error) => {
      console.error("Caught error in promise chain:", error.message);
      section2OutputDiv.textContent = `Error: ${error.message}`;
    });
});

/*
  Exercise 9: Using async and await

  Description:

  Rewrite the Promise chain from Exercise 7 using async and await.

  Ensure proper error handling using try-catch.

  Display the returned data in the #section-2-output div when the
  #exercise-9-btn is clicked.
*/

// Exercise 9
async function handleDataWithAsyncAwait() {
  try {
    const data = await getDataPromise();
    const processedData = await processData(data);
    section2OutputDiv.textContent = processedData;
  } catch (error) {
    console.error("Error in async function:", error);
  }
}

document.getElementById("exercise-9-btn").addEventListener("click", () => {
  handleDataWithAsyncAwait();
});

/*
  Exercise 10: Sequential API Requests with async/await

  Description:

  When the #exercise-10-btn is clicked, fetch two posts
  sequentially from https://jsonplaceholder.typicode.com/posts/5 and
  https://jsonplaceholder.typicode.com/posts/6 using async/await.

  Display both posts in the #section-1-output div.
*/

// Exercise 10
document.getElementById("exercise-10-btn").addEventListener("click", async () => {
  try {
    const response1 = await fetch("https://jsonplaceholder.typicode.com/posts/5");
    const post1 = await response1.json();

    const response2 = await fetch("https://jsonplaceholder.typicode.com/posts/6");
    const post2 = await response2.json();

    section1OutputDiv.textContent = JSON.stringify([post1, post2], null, 2);
  } catch (error) {
    console.error("Error fetching posts sequentially:", error);
  }
});

/*
  Exercise 11: Parallel API Requests with Promise.all

  Description:

  When the #exercise-11-btn is clicked, fetch two posts in parallel
  from https://jsonplaceholder.typicode.com/posts/10 and
  https://jsonplaceholder.typicode.com/posts/15 using Promise.all and
  display the results.
*/

// Exercise 11
document.getElementById("exercise-11-btn").addEventListener("click", () => {
  Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts/10").then((response) =>
      response.json()
    ),
    fetch("https://jsonplaceholder.typicode.com/posts/15").then((response) =>
      response.json()
    ),
  ])
    .then((posts) => {
      section1OutputDiv.textContent = JSON.stringify(posts, null, 2);
    })
    .catch((error) => {
      console.error("Error fetching posts in parallel:", error);
    });
});

/*
  Exercise 12: Using Promise.race

  Description:

  Implement a function that uses Promise.race to fetch data from these two URLs:
  - https://jsonplaceholder.typicode.com/posts/16
  - https://jsonplaceholder.typicode.com/posts/20

  Display the result of the first one that resolves to #section-1-output
  when the #exercise-12-btn is clicked.
*/

// Exercise 12
document.getElementById("exercise-12-btn").addEventListener("click", () => {
  Promise.race([
    fetch("https://jsonplaceholder.typicode.com/posts/16").then((response) =>
      response.json()
    ),
    fetch("https://jsonplaceholder.typicode.com/posts/20").then((response) =>
      response.json()
    ),
  ])
    .then((firstPost) => {
      section1OutputDiv.textContent = JSON.stringify(firstPost, null, 2);
    })
    .catch((error) => {
      console.error("Error in Promise.race:", error);
    });
});

/*
  Exercise 13: Using Promise.allSettled

  Description:

  When the #exercise-13-btn is clicked, make multiple fetch requests
  where some may fail:
    - "https://jsonplaceholder.typicode.com/posts/23"
    - "https://jsonplaceholder.typicode.com/invalid-url"
    - "https://jsonplaceholder.typicode.com/posts/25"

  Use Promise.allSettled to handle all outcomes and display the statuses
  in #section-1-output.
*/

// Exercise 13
document.getElementById("exercise-13-btn").addEventListener("click", () => {
  const fetchAndCheck = (url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    });

  Promise.allSettled([
    fetchAndCheck("https://jsonplaceholder.typicode.com/posts/23"),
    fetchAndCheck("https://jsonplaceholder.typicode.com/invalid-url"),
    fetchAndCheck("https://jsonplaceholder.typicode.com/posts/25"),
  ]).then((results) => {
    const statuses = results.map((result, index) => {
      if (result.status === "fulfilled") {
        return `Request ${index + 1}: fulfilled - Post ID ${result.value.id} ("${result.value.title}")`;
      }
      return `Request ${index + 1}: rejected - ${result.reason.message}`;
    });
    section1OutputDiv.textContent = statuses.join("\n");
    console.log("Promise.allSettled results:", results);
  });
});

/*
  Exercise 14: Using Promise.any

  Description:

  Implement functionality to fetch data from multiple sources using Promise.any
  and display the first successful response to #section-1-output when the
  #exercise-14-btn is clicked.

    - "https://jsonplaceholder.typicode.com/invalid-url1"
    - "https://jsonplaceholder.typicode.com/invalid-url2"
    - "https://jsonplaceholder.typicode.com/posts/2"
*/

// Exercise 14
document.getElementById("exercise-14-btn").addEventListener("click", () => {
  const fetchAndCheck = (url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Request to ${url} failed with status ${response.status}`);
      }
      return response.json();
    });

  Promise.any([
    fetchAndCheck("https://jsonplaceholder.typicode.com/invalid-url1"),
    fetchAndCheck("https://jsonplaceholder.typicode.com/invalid-url2"),
    fetchAndCheck("https://jsonplaceholder.typicode.com/posts/2"),
  ])
    .then((firstSuccessfulPost) => {
      section1OutputDiv.textContent = JSON.stringify(firstSuccessfulPost, null, 2);
    })
    .catch((error) => {
      console.error("All requests failed:", error);
      section1OutputDiv.textContent = "All requests failed";
    });
});

/*
  Exercise 15: Handling Rejected Promises Globally

  Description:

  Set up a global handler for unhandled promise rejections using
  window.addEventListener('unhandledrejection', handler).

  Test it by creating a rejected promise without a catch block.
*/

// Exercise 15
window.addEventListener("unhandledrejection", (event) => {
  console.error("Globally handled unhandled rejection:", event.reason.message);
});

// Test: this promise rejects and deliberately has no .catch() attached,
// so the global unhandledrejection handler above is what catches it.
new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("This rejection has no catch block"));
  }, 500);
});

/*
  Exercise 16: Combining Promises and Async/Await

  Description:

  Use both promises and async/await to fetch data and process it.
    - https://jsonplaceholder.typicode.com/posts/10

  Fetch data using fetch (which returns a promise), then process it in
  an async function using await.
*/

// Exercise 16
async function fetchAndProcessPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/10");
    const post = await response.json();
    const processedPost = `Post ${post.id}: ${post.title.toUpperCase()}`;
    console.log("Exercise 16 processed result:", processedPost);
    section1OutputDiv.textContent = JSON.stringify(post, null, 2);
  } catch (error) {
    console.error("Error in fetchAndProcessPost:", error);
  }
}

fetchAndProcessPost();

/*
  Exercise 17: Using Promise.resolve and Promise.reject

  Description:

  Create functions that return Promise.resolve and Promise.reject immediately.

  Use them to test promise handling without asynchronous operations.
*/

// Exercise 17
function getImmediateResolvedPromise() {
  return Promise.resolve("Resolved immediately");
}

function getImmediateRejectedPromise() {
  return Promise.reject(new Error("Rejected immediately"));
}

getImmediateResolvedPromise().then((value) => {
  console.log("Exercise 17:", value);
});

getImmediateRejectedPromise().catch((error) => {
  console.error("Exercise 17:", error.message);
});

/*
  Exercise 18: Implementing a Simple Promise-based Timeout

  Description:

  Create a function `delay` that returns a promise that resolves
  after a specified number of milliseconds.

  Use it to delay actions in your code.
*/

// Exercise 18
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(1000).then(() => {
  console.log("Exercise 18: This action was delayed by 1000 milliseconds");
});

/*
  Exercise 19: Sequential Execution with for Loop and await

  Description:

  Fetch multiple posts sequentially in a loop using async/await.
  - HINT - `https://jsonplaceholder.typicode.com/posts/${loop_index_number}`

  Display each post inside #section-1-output as it is fetched.
*/

// Exercise 19
async function fetchPostsSequentially() {
  section1OutputDiv.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`);
    const post = await response.json();
    section1OutputDiv.innerHTML += `<p>Post ${post.id}: ${post.title}</p>`;
    console.log(`Fetched post ${post.id}`);
  }
}

fetchPostsSequentially();

/*
  Exercise 20: Converting Callback-based Functions to Promises

  Description:

  Given a callback-based function `readFileCallback`, wrap it in a
  function `readFilePromise` that returns a Promise.
*/

// Simulating a callback-based function
function readFileCallback(filename, callback) {
  setTimeout(() => {
    if (filename === "valid.txt") {
      callback(null, "File content");
    } else {
      callback("File not found", null);
    }
  }, 1000);
}

// Exercise 20
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    readFileCallback(filename, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromise("valid.txt")
  .then((content) => {
    console.log("Exercise 20 - readFilePromise resolved:", content);
  })
  .catch((error) => {
    console.error("Exercise 20 - readFilePromise rejected:", error);
  });

readFilePromise("missing.txt")
  .then((content) => {
    console.log("Exercise 20 - readFilePromise resolved:", content);
  })
  .catch((error) => {
    console.error("Exercise 20 - readFilePromise rejected (expected):", error);
  });

/*
  Exercise 21: Handling Multiple Async Operations with Different Timing

  Description:

  Create multiple promises that resolve after different delays.

  Use Promise.all to wait for all to complete and display the results.
*/

// Exercise 21
function delayedPromise(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

Promise.all([
  delayedPromise(1000, "First result (1000ms)"),
  delayedPromise(2000, "Second result (2000ms)"),
  delayedPromise(1500, "Third result (1500ms)"),
]).then((results) => {
  console.log("Exercise 21 - all operations complete:", results);
  section1OutputDiv.textContent = results.join("\n");
});
