import fs from "fs";

// Convert this callback-based function to return a Promise

// Callback version
function readJsonFile(path, callback) {
  fs.readFile(path, "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }
    try {
      const parsed = JSON.parse(data);
      callback(null, parsed);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

const ORDERS_FILE_PATH = "../../week2/file-system/orders.json";

readJsonFile(ORDERS_FILE_PATH, (error, data) => {
  if (error) {
    console.error(error.message);
    return;
  }
});

// Convert to Promise version
function readJsonFilePromise(path) {
  return new Promise((resolve, reject) => {
    readJsonFile(path, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
}

// Test it:
readJsonFilePromise(ORDERS_FILE_PATH)
  .then((data) => {
    data.forEach((order) => console.log(JSON.stringify(order)));
  })
  .catch((error) => console.error(error.message));

