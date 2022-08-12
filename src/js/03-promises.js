import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayField = document.querySelector('[name=delay]');
const stepField = document.querySelector('[name=step]');
const amountField = document.querySelector('[name=amount]');
const createBtn = document.querySelector('button');

createBtn.addEventListener('click', evt => {
  evt.preventDefault();
  for (let i = 0; i < Number(amountField.value); i += 1) {
    const delays = Number(delayField.value) + stepField.value * i;
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
