import { getRandomElement, getRandomNumber } from './utils.js';

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Иван', 'Мария', 'Ольга', 'Николай', 'Елена', 'Сергей', 'Анна'];

export function generateComments() {
  const commentsCount = getRandomNumber(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: getRandomNumber(1, 1000), // уникальные идентификаторы
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomElement(messages),
      name: getRandomElement(names),
    });
  }

  return comments;
}
