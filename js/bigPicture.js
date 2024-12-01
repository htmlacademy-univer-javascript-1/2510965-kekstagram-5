import { isEscKey } from './utils.js';

const DEFAULT_RENDERED_COMMENTS = 5;
const STEP_ADDED_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__src');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoaderBtn = bigPicture.querySelector('.comments-loader');
const bigPictureCounterComments = bigPicture.querySelector('.social__comment-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureLike = bigPicture.querySelector('.likes-count');

let actualComments = [];

let countRenderedComments = DEFAULT_RENDERED_COMMENTS;

const getCommentTemplate = ({avatar, message, name}) => `<li class="social__comment">
  <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
  <p class="social__text">${message}</p>
</li>`;

const getCounterCommentsTemplate = (commentsCount) => `${Math.min(countRenderedComments, commentsCount)} из <span class="comments-count">${commentsCount}</span> комментариев`;

const getCounterComments = () => {
  bigPictureCounterComments.innerHTML='';
  bigPictureCounterComments.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
};

const renderComments = () => {
  getCounterComments();

  bigPictureCommentsList.innerHTML='';
  const commentsTemplate = actualComments.slice(0, countRenderedComments).map((comment) => getCommentTemplate(comment)).join('');
  bigPictureCommentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (countRenderedComments >= actualComments.length) {
    bigPictureCommentsLoaderBtn.removeEventListener('click', onBigPictureCommentsLoaderBtnClick);
    bigPictureCommentsLoaderBtn.classList.add('hidden');
  }
};

const initComments = (comments) => {
  actualComments = comments.slice();
  bigPictureCommentsList.innerHTML='';

  if (comments.length === 0) {
    bigPictureCommentsLoaderBtn.classList.add('hidden');
    bigPictureCounterComments.textContent='Нет комментариев';
    return;
  }

  renderComments();
  bigPictureCommentsLoaderBtn.addEventListener('click', onBigPictureCommentsLoaderBtnClick);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureCloseBtn.removeEventListener('click', onBigPictureCloseBtnClick);
  window.removeEventListener('keydown', onWindowEscKeydown);
  bigPictureCommentsLoaderBtn.classList.remove('hidden');
  bigPictureCommentsLoaderBtn.removeEventListener('click', onBigPictureCommentsLoaderBtnClick);
  countRenderedComments = DEFAULT_RENDERED_COMMENTS;
};

function onBigPictureCloseBtnClick() {
  closeBigPicture();
}

function onWindowEscKeydown(evt) {
  if(isEscKey(evt)){
    closeBigPicture();
  }
}

function onBigPictureCommentsLoaderBtnClick() {
  countRenderedComments += STEP_ADDED_COMMENTS;
  renderComments();
}

const getBigPicture = (photo) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureImg.src = photo.url;
  bigPictureCaption.textContent = photo.description;
  bigPictureLike.textContent = photo.likes;

  initComments(photo.comments);

  bigPictureCloseBtn.addEventListener('click', onBigPictureCloseBtnClick);
  window.addEventListener('keydown', onWindowEscKeydown);
};

export { getBigPicture };