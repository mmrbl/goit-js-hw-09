import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayField = document.querySelector('[name=delay]');
const stepField = document.querySelector('[name=step]');
const amountField = document.querySelector('[name=amount]');
const createBtn = document.querySelector('button');

createBtn.addEventListener('click', e => {
  e.preventDefault();
  const amuontValue = Number(amountField.value);
  const delayValue = Number(delayField.value);
  const stepValue = Number(stepField.value);

  for (let i = 1; i < amuontValue + 1; i++) {
    const delays = delayValue + stepValue * i;
    createPromise(i, delays)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  document.querySelector('.form').reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
