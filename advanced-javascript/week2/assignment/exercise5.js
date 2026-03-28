// Create a utility function that runs delayed operations in sequence

const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

function runSequentially(tasks, finalCallback) {
  // function next(index) {
  //   if (index === tasks.length) {
  //     finalCallback();
  //     return;
  //   }
  //   tasks[index](() => next(index + 1));
  // }
  // next(0);

  const final = tasks.reverse().reduce((carry, f) => () => f(carry), finalCallback)
  final()
}

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
