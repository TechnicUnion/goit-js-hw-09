import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelay: document.getElementsByName('delay'),
  stepDelay: document.getElementsByName('step'),
  amount: document.getElementsByName('amount'),
  promiseCreateButton: document.querySelector('button'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
    return { position, delay };
  });
}

refs.promiseCreateButton.addEventListener('click', onPromiseCreate);

function onPromiseCreate(evt) {
  evt.preventDefault();
  let totalDelay = Number(refs.firstDelay[0].value);
  if (refs.amount[0].value < 1) {
    return;
  }
  for (i = 1; i <= refs.amount[0].value; i += 1) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        return Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        return Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += Number(refs.stepDelay[0].value);
  }
}
