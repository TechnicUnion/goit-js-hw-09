import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const refs = {
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
let timerID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      startButton.setAttribute('disabled', 'true');
      return window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled', 'true');
      startButton.addEventListener('click', onStartButtonClick);
    }
  },
};

const fp = flatpickr(inputDate, options);
startButton.setAttribute('disabled', 'true');

function onStartButtonClick() {
  startButton.setAttribute('disabled', 'true');
  const selectedTime = fp.selectedDates[0].getTime();
  timerID = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    if (deltaTime <= 1) {
      clearInterval(timerID);
      return window.alert('Timeout complete');
    }
    const time = convertMs(deltaTime);
    updateClockFace(time);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}
