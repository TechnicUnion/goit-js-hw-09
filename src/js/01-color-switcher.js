const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopButton.setAttribute('disabled', 'true');

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  timerId = setInterval(bodyBackgroundColorChange, 1000);
  changeButtonStatus();
}

function onStopButtonClick() {
  clearInterval(timerId);
  changeButtonStatus();
}

function bodyBackgroundColorChange() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeButtonStatus() {
  if (startButton.hasAttribute('disabled')) {
    startButton.removeAttribute('disabled', 'true');
    stopButton.setAttribute('disabled', 'true');
  } else {
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled', 'true');
  }
}
