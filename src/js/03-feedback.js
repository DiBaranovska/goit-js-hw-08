import trottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('form');
savedForm();
form.addEventListener('submit', submitForm);

form.addEventListener('input', trottle(inputForm, 500));

function inputForm(event) {
  const formResult = {
    email: event.target.value,
    message: event.target.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formResult));
}
function savedForm() {
  const savedSettings = localStorage.getItem(STORAGE_KEY);
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings);
    for (let key in parsedSettings) {
      form.elements[key].value = parsedSettings[key];
    }
  }
}

function submitForm(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const formResult = {
    email: formElements.email.value,
    message: formElements.message.value,
  };
  console.log(formResult);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
