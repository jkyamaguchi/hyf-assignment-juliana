const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// Fetch 3 specific teas (IDs 1, 5, and 10) in parallel using Promise.all.

async function getThreeTeas() {
  const ids = [1, 5, 10];
  const start = Date.now();

  // 1. Create an array of fetch Promises (use .map())
  const fetchPromises = ids.map((id) =>
    fetch(`${API_BASE}/teas/${id}`).then((res) => res.json()),
  );

  // 2. Use Promise.all() to wait for all of them
  const teas = await Promise.all(fetchPromises);

  // 3. Log each tea's name
  teas.forEach((tea) => console.log(tea.name));

  console.log(`Operation took ${Date.now() - start}ms`);
}

getThreeTeas();

// All three fetches run at the same time.
// Promise.all only waits as long as the slowest one
// - much faster than fetching one after another.
