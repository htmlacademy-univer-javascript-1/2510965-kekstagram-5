import {getPhotoDescription} from './data.js';
import {createPhotosElement} from './bigPictures.js';
const photos = getPhotoDescription();
createPhotosElement(photos);