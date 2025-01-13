import { fetchPhotos } from './server.js';
import { setFormSubmit } from './form.js';
import { initFilters } from './filter.js';
import { renderPhotos } from './big-pictures.js';
import { alertDataLoadError } from './utils.js';

let photos = [];

const handleSuccessLoad = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

fetchPhotos(handleSuccessLoad, alertDataLoadError).then();
initFilters();
setFormSubmit();

export {photos};
