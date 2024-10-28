import PictureRenderer from './pictureRenderer.js';

const pictures = [
  {
    url: './photos/1.jpg',
    description: 'Описание изображения 1',
    likes: 10,
    comments: 5
  },
  {
    url: './photos/2.jpg',
    description: 'Описание изображения 2',
    likes: 20,
    comments: 10
  },
];

const renderer = new PictureRenderer('.pictures', '#picture');
renderer.renderPictures(pictures);