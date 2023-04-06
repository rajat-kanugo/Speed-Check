const typeText = "https://api.quotable.io/random";
const textArea = document.querySelector(".txt-area");
const textAreaInp = document.querySelector(".txt-inp");
const timer = document.querySelector(".timer");
const wpm = document.querySelector(".wpm-span");
const wpmBlock = document.querySelector(".wpm");
let charTyped = 0;
let timeTaken = 15;
let jump = 0;

let correctChar = false;

textAreaInp.addEventListener("input", () => {
  const sentArr = textArea.querySelectorAll("span");
  const typedArr = textAreaInp.value.split("");

  if (charTyped == 0) {
    onkeydown = startTimer();
  }
  // console.log(window.event, charTyped);
  if (window.event.data !== null && correctChar && window.event.data !== " ") {
    charTyped++;
  }
  let correct = true;
  sentArr.forEach((char, index) => {
    const ch = typedArr[index];
    if (ch == null) {
      char.classList.remove("correct");
      char.classList.remove("incorrect");
      correct = false;
    } else if (ch == char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
      correctChar = true;
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
      correctChar = false;
    }
  });
  if (correct) renderNewSent();
});
function getRandomSent() {
  return fetch(typeText).then((Response) =>
    Response.json().then((data) => data.content)
  );
}
async function renderNewSent() {
  const quote = await getRandomSent();
  textArea.innerHTML = "";
  quote.split("").forEach((char) => {
    const ch = document.createElement("span");
    ch.innerText = char;
    textArea.appendChild(ch);
  });
  textAreaInp.value = null;
}

let startTime,
  finalWpm = 0;
function startTimer() {
  startTime = new Date();
  z = setInterval((e) => {
    e = getTimerTime();
    jump = 70 / timeTaken;
    if (e == timeTaken) {
      textAreaInp.disabled = true;
      clearInterval(z);
      wpmBlock.classList.add("show");
      wpm.classList.add("show");
      finalWpm = Math.round((charTyped / 5 / timeTaken) * 60);
      wpm.innerText = finalWpm;
    }
  }, 1000);
  loadingBar();
}
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

let i = 0;
function loadingBar() {
  if (i == 0) {
    i = 1;
    width = 1;
    let z = setInterval(frame, 1000);
    function frame() {
      if (width >= 70) {
        clearInterval(z);
        i = 0;
      } else {
        width += jump;
        timer.style.width = width - 1 + "%";
      }
    }
  }
}

renderNewSent();

async function reloadPage() {
  wpmBlock.classList.remove("show");
  textAreaInp.disabled = false;
  charTyped = 0;
  textAreaInp.focus();
  const quote = await renderNewSent();
  if (quote) {
    startTimer();
  }
}
