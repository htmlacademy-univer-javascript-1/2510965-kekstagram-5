import { openBigPicture } from './openBigPictures.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();


const createPictureElement = (picture) => {
  const { url, description, likes, comments } = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    picturesFragment.appendChild(createPictureElement(photo));
  });

  pictures.appendChild(picturesFragment);
};

const removePictures = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach((element) => {
      element.remove();
    });
  }
};

export { renderPhotos, removePictures };