import { generateComments } from './comments.js';
import { getRandomNumber } from './utils.js';

export function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Фотография номер ${i}`,
      likes: getRandomNumber(15, 200),
      comments: generateComments(),
    });
  }

  return photos;
}