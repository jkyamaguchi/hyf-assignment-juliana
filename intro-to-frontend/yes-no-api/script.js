const button = document.getElementById("yes-no-btn");
const resultDiv = document.getElementById("result");

button.addEventListener("click", fetchYesOrNo);

function fetchYesOrNo() {
  fetch("https://yesno.wtf/api/")
    .then((response) => response.json())
    .then((yesOrNoData) => {
      console.log(yesOrNoData);
      displayResult(yesOrNoData);
    });
}

function displayResult(data) {
    
  resultDiv.replaceChildren();

  const answerText = document.createElement("p");
  answerText.textContent = data.answer;

  const imageEl = document.createElement("img");
  imageEl.src = data.image;
  imageEl.alt = `${data.answer} image`;

  resultDiv.append(answerText, imageEl);
}
