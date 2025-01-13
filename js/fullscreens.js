import {isEscapePressed} from './utils.js';

const modalContainer = document.querySelector('.big-picture');
const metadataContainer = modalContainer.querySelector('.big-picture__social');
const commentsContainer = metadataContainer.querySelector('.social__comments');
const modalCloseButton = modalContainer.querySelector('.big-picture__cancel');
const loadMoreButton = metadataContainer.querySelector('.social__comments-loader');
const commentsCounter = metadataContainer.querySelector('.social__comment-shown-count');
const COMMENTS_BATCH_SIZE = 5;
const picturePreview = modalContainer.querySelector('.big-picture__img');
let onLoader;

const renderComment = (comment) => {
  commentsContainer.insertAdjacentHTML('beforeend', `<li class="social__comment"><img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"><p class="social__text">${comment.message}</p></li>`);
};

const toggleLoaderButton = (totalComments) => {
  commentsCounter.textContent = commentsContainer.children.length;
  if (totalComments === commentsContainer.children.length) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
};

const populateComments = (comments) => {
  commentsContainer.innerHTML = '';

  for (let i = 0; i < Math.min(comments.length, COMMENTS_BATCH_SIZE); ++i) {
    renderComment(comments[i]);
  }
  toggleLoaderButton(comments.length);

  onLoader = () => {
    const displayedCount = commentsContainer.children.length;
    for (let i = displayedCount; i < displayedCount + Math.min(COMMENTS_BATCH_SIZE, comments.length - displayedCount); ++i) {
      renderComment(comments[i]);
    }
    toggleLoaderButton(comments.length);
  };

  loadMoreButton.addEventListener('click', onLoader);
};

const renderBigPicture = (url, description, likes, comments) => {
  if (!url || !comments) {
    return;
  }

  picturePreview.querySelector('img').src = url;
  metadataContainer.querySelector('.likes-count').textContent = likes;
  metadataContainer.querySelector('.social__caption').textContent = description;
  metadataContainer.querySelector('.social__comment-total-count').textContent = comments.length;
  populateComments(comments);
};

const onKeydown = (evt) => {
  if (isEscapePressed(evt)) {
    onCloseModal();
  }
};

function onCloseModal() {
  modalContainer.classList.add('hidden');
  document.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('modal-open');
  if (onLoader) {
    loadMoreButton.removeEventListener('click', onLoader);
    onLoader = null;
  }

  commentsContainer.innerHTML = '';
}

modalCloseButton.addEventListener('click', () => {
  onCloseModal();
});

function openModal(url, description, likes, comments) {
  modalContainer.classList.remove('hidden');
  document.addEventListener('keydown', onKeydown);
  document.body.classList.add('modal-open');
  renderBigPicture(url, description, likes, comments);
}

export { openModal };
