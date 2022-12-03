// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const showDays = document.querySelector('[data-days]');
const showHours = document.querySelector('[data-hours]');
const showMinutes = document.querySelector('[data-minutes]');
const showSeconds = document.querySelector('[data-seconds]');
const datetime = document.querySelector('#datetime-picker');

let deadline = null;
const notifixOptions = {
  position: 'right-top',
  timeout: 3000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
};
startBtn.disabled = true;

flatpickr(datetime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = selectedDates[0];
    if (deadline <= Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure(
        'Please choose a date in the future',
        notifixOptions
      );
    } else {
      startBtn.disabled = false;
    }
    console.log(deadline);
  },
});

startBtn.addEventListener('click', function start() {
  const interval = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = deadline - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    showDays.textContent = days;
    showHours.textContent = hours;
    showMinutes.textContent = minutes;
    showSeconds.textContent = seconds;

    if (deltaTime <= 500) {
      Notiflix.Notify.success('✽-(˘U˘)/✽', notifixOptions);
      clearInterval(interval);
    }
    // console.log(showSeconds.textContent);
  }, 1000);
});

// функція. яка дописує символ нуль, якщо довжина стрічки менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
