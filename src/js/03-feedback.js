import trottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('form');
const emailInput = document.querySelector('input');
const textareaInput = document.querySelector('textarea');

form.addEventListener('submit', submitForm);

emailInput.addEventListener('input', trottle(inputEmail, 500));
textareaInput.addEventListener('input', trottle(inputTextarea, 500));

let formResult = {
  email: '',
  message: '',
};

savedForm();
function inputEmail(event) {
  formResult = { ...formResult, email: event.target.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formResult));
  return formResult;
}

function inputTextarea(event) {
  formResult = { ...formResult, message: event.target.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formResult));
  return formResult;
}

function savedForm() {
  const savedSettings = localStorage.getItem(STORAGE_KEY);
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings);
    formResult = { ...parsedSettings };
    for (let key in parsedSettings) {
      form.elements[key].value = parsedSettings[key];
    }
  }
}

function submitForm(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  if (formElements.email.value && formElements.message.value !== '') {
    const formResultConsol = {
      email: formElements.email.value,
      message: formElements.message.value,
    };
    formResult = {
      email: '',
      message: '',
    };
    console.log(formResultConsol);
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
