const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Create a fetchTeaWithTimeout(id, timeoutMs) function. It should:
//     Fetch the tea from the API
//     Reject if it takes longer than timeoutMs

// Hints:
//     Use setTimeout to create a timeout that calls reject
//     Use clearTimeout to cancel the timeout if fetch succeeds
//     Remember to handle fetch errors too

function fetchTeaWithTimeout(id, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeOutId = setTimeout(() => {
      reject(new Error("Timeout hit"));
    }, timeoutMs);

    fetch(`${API_BASE}/teas/${id}`)
      .then((result) => result.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      })
      .finally(() => {
        clearTimeout(timeOutId);
      });
  });
}

// Test with a generous timeout (should work)
fetchTeaWithTimeout(1, 5000)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));

// Test with a tiny timeout (should fail)
fetchTeaWithTimeout(1, 1)
  .then((tea) => console.log("Got:", tea.name))
  .catch((err) => console.log("Failed:", err.message));