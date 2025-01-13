const isEscapePressed = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    removeMessage();
  }
};

const onButtonClick = () => {
  removeMessage();
};

const onOutsideClick = (evt) => {
  if (evt.target === document.body.lastElementChild) {
    removeMessage();
  }
};

function removeMessage() {
  const messageElement = document.body.lastElementChild;
  messageElement.querySelector('button').removeEventListener('click', onButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideClick);
  messageElement.remove();
}

const showTemplateMessage = (templateId) => {
  const templateContent = document.querySelector(`#${templateId}`).content;
  const messageNode = templateContent.cloneNode(true);
  document.body.appendChild(messageNode);
};

const showResult = (templateId) => {
  showTemplateMessage(templateId);
  const closeButton = document.querySelector(`.${templateId}__button`);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
  closeButton.addEventListener('click', onButtonClick);
};

const showSuccessUploadMessage = () => showResult('success');
const showErrorUploadMessage = () => showResult('error');
const alertDataLoadError = () => showTemplateMessage('data-error');

const debounceFunction = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};

const getRandomInt = (min, max) => {
  const minVal = Math.ceil(Math.min(min, max));
  const maxVal = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
};

const randomSequenceGenerator = (min, max) => {
  const generatedValues = [];

  return () => {
    if (generatedValues.length >= max - min + 1) {
      return null;
    }

    let value;
    do {
      value = getRandomInt(min, max);
    } while (generatedValues.includes(value));

    generatedValues.push(value);
    return value;
  };
};

const pickRandomItems = (array, count, randomizer) =>
  Array.from({ length: count }, () => array[randomizer()]);

const switchButtons = (buttons, activeId) => {
  const activeButton = document.querySelector(`#${activeId}`);
  buttons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button === activeButton);
    button.disabled = button === activeButton;
  });
};

const isElementFocused = (className) => document.activeElement.classList.contains(className);

export {
  showSuccessUploadMessage,
  showErrorUploadMessage,
  alertDataLoadError,
  pickRandomItems,
  switchButtons,
  debounceFunction,
  randomSequenceGenerator,
  isEscapePressed,
  isElementFocused,
};
