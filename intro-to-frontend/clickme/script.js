// change the event type
document.querySelector("button").addEventListener("click", function (event) {
  // what does the event do?
  console.log(event);
  document.body.style.backgroundColor = "red";
});
