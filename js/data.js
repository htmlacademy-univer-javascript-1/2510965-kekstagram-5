import {getRandomInteger, createRandomNumbers, getRandomArrayElement} from './utils.js';

const DESCRIPTIONS = [
  'Отдыхаю',
  'С семьёй',
  'Красота',
  'Работаем',
  'Выходные'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Ольга', 'Екатерина', 'Мария', 'Иван', 'Анастасия', 'Александр', 'Владимир', 'Сергей', 'Татьяна', 'Дмитрий'];

const generatePhotoId = createRandomNumbers(1, 25);
const urlId = createRandomNumbers(1, 25);
const generateNumbersOfLikes = createRandomNumbers(15, 200);
const userId = createRandomNumbers(1, 100000);

const createComment = () => ({
  id: userId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${urlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateNumbersOfLikes(),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
});

const createPhotoDescriptions = () => Array.from({length: 25}, createPhotoDescription);

export {createPhotoDescriptions};