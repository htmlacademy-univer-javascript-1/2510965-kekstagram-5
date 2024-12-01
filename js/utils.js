const DELAY = 500;

const getRandomPositiveInclusive = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(max), Math.abs(min)));
  max = Math.floor(Math.max(Math.abs(max), Math.abs(min)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElements = (elements, randomElementsCount) => {
  const elementNumbers = [];
  const randomElements = [];
  for (let i = 0; i < elements.length; i++) {
    const number = getRandomPositiveInclusive(0, elements.length - 1);
    if (elementNumbers.indexOf(number) === -1) {
      randomElements.push(elements[number]);
      elementNumbers.push(number);
    }
    if (randomElements.length === randomElementsCount) {
      break;
    }
  }
  return randomElements;
};

const isEscKey = (evt) => evt.keyCode === 27;

const debounce = (cb) => {
  let lastTimeout = null;
  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

export { getRandomPositiveInclusive, isEscKey, debounce, getRandomElements };