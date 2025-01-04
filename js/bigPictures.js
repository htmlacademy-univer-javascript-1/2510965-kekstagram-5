import { openModal } from './fullscreens.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = template.cloneNode(true);

    const img = photoElement.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    const info = photoElement.querySelector('.picture__info');
    info.querySelector('.picture__likes').textContent = likes;
    info.querySelector('.picture__comments').textContent = comments.length;

    photoElement.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(url, description, likes, comments);
    });

    fragment.appendChild(photoElement);
  });

  container.appendChild(fragment);
};

const clearPhotos = () => {
  const photos = container.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

export {renderPhotos, clearPhotos};