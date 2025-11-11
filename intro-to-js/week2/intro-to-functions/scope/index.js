const global = "global";
function scopeTest() {
  console.log(functionScope); //functionScope not defined yet.
  console.log(global);
  const functionScope = "functionScope";

  function tester() {
    console.log(global);

    const testerVariable = "testerVariable";
  }

  tester();
  console.log(testerVariable); //testerVariable out of scope.
}

scopeTest();