import './uploadPhoto.js';
import { loadData } from './fetch.js';
import { renderPhotos } from './uploadPhoto.js';
import './addHashtag.js';
import './slider.js';
import './filter.js';

let photos;

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(data.slice());
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onFail = () => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '25px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Возникла ошибка при загрузке фотографий';
  document.body.append(messageAlert);
};

loadData(onSuccess, onFail);

export { photos };

