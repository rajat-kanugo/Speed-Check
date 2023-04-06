const time = document.querySelector(".time");
const mainTheme = document.querySelector(".main");

const timeSlots = document.querySelector(".time-cap");
const m1 = document.querySelector(".m1");
const m2 = document.querySelector(".m2");
const m3 = document.querySelector(".m3");

const typeSpace = document.querySelector(".txt-inp");
time.addEventListener("click", () => {
  timeSlots.classList.add("show");
});

m1.addEventListener("click", () => {
  timeTaken = 15;
  console.log(timeTaken);
  typeSpace.focus();
  timeSlots.classList.remove("show");
});
m2.addEventListener("click", () => {
  timeTaken = 30;
  console.log(timeTaken);
  typeSpace.focus();
  timeSlots.classList.remove("show");
});
m3.addEventListener("click", () => {
  timeTaken = 60;
  console.log(timeTaken);
  typeSpace.focus();
  timeSlots.classList.remove("show");
});

const darkMode = () => {
  mainTheme.classList.add("dark");
  typeSpace.focus();
};
const lightMode = () => {
  mainTheme.classList.remove("dark");
  typeSpace.focus();
};
