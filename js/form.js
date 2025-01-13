import {sendPhotos} from './server.js';
import {updatePreview} from './image.js';
import {showErrorUploadMessage, showSuccessUploadMessage} from './utils.js';
import {isTagCountValid, checkTagsUnique, onHandleKeyDown, validateCommentLength, validateTags} from './add-hashtag.js';
import {onHandleEffectChange, resetToDefaultEffect} from './slider.js';

const imageForm = document.querySelector('.img-upload__form');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const exitButton = imageForm.querySelector('.img-upload__cancel');
const descriptionField = imageForm.querySelector('.text__description');
const hashTagsField = imageForm.querySelector('.text__hashtags');
const scaleOutput = imageForm.querySelector('.scale__control--value');
const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);
const imagePreview = imageForm.querySelector('#preview');
const scaleAddButton = imageForm.querySelector('.scale__control--bigger');
const scaleDecreaseButton = imageForm.querySelector('.scale__control--smaller');
const filterButtonList = document.querySelector('.effects__list');
const SCALE_DIFFERENCE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const onOperateScale = (evt) => {
  let scale = parseInt(scaleOutput.value, 10);
  if (evt.target.classList.contains('scale__control--bigger') && scale + SCALE_DIFFERENCE <= MAX_SCALE) {
    scale += SCALE_DIFFERENCE;
  } else if (evt.target.classList.contains('scale__control--smaller') && scale - SCALE_DIFFERENCE >= MIN_SCALE) {
    scale -= SCALE_DIFFERENCE;
  }

  scaleOutput.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale / 100})`;
};

const addFilters = () => filterButtonList.addEventListener('click', onHandleEffectChange);

pristine.addValidator(hashTagsField, isTagCountValid, 'Слишком много хэш-тегов');
pristine.addValidator(hashTagsField, checkTagsUnique, 'Повтор хэш-тега');
pristine.addValidator(hashTagsField, validateTags, 'Невалидный хэш-тег');

pristine.addValidator(descriptionField, validateCommentLength, 'Комментарий длиннее 140 символов');

const openModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onHandleKeyDown);
  exitButton.addEventListener('click', onCloseModal);
  scaleAddButton.addEventListener('click', onOperateScale);
  scaleDecreaseButton.addEventListener('click', onOperateScale);
  updatePreview();
  addFilters();
};

function onCloseModal(){
  pristine.reset();
  uploadInput.value = '';
  descriptionField.value = '';
  hashTagsField.value = '';
  scaleOutput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  resetToDefaultEffect();
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onHandleKeyDown);
  exitButton.removeEventListener('click', onCloseModal);
  scaleAddButton.removeEventListener('click', onOperateScale);
  scaleDecreaseButton.removeEventListener('click', onOperateScale);
  filterButtonList.removeEventListener('click', onHandleEffectChange);
}

uploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

exitButton.addEventListener('click', () => {
  onCloseModal();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onFormSubmitSuccess = () => {
  showSuccessUploadMessage();
  onCloseModal();
};

const setFormSubmit = () => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      blockSubmitButton();
      sendPhotos(new FormData(evt.target), onFormSubmitSuccess, showErrorUploadMessage)
        .finally(() => unblockSubmitButton());
    }
  });
};

export {setFormSubmit, onCloseModal, openModal};
