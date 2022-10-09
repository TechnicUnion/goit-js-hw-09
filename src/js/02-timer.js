import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const refs = {
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
let timerID = null;

startButton.addEventListener('click', onStartButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      changeElementAttributDisabled(startButton);
      changeElementAttributDisabled(inputDate);
    }
  },
};

const fp = flatpickr(inputDate, options);
changeElementAttributDisabled(startButton);

function onStartButtonClick() {
  changeElementAttributDisabled(startButton);
  const selectedTime = fp.selectedDates[0].getTime();
  timerID = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTime - currentTime;
    if (deltaTime <= 1) {
      clearInterval(timerID);
      changeElementAttributDisabled(inputDate);
      return Notify.success('Congratulations! Timeout complete');
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

function changeElementAttributDisabled(el) {
  if (el.hasAttribute('disabled')) {
    el.removeAttribute('disabled', 'true');
  } else el.setAttribute('disabled', 'true');
}
