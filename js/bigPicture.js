const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureClose = bigPicture.querySelector('.big-picture__close');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

function openBigPicture(data) {
  // Заполняем данные для окна
  bigPictureImg.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  socialCaption.textContent = data.description;

  // Очищаем существующие комментарии
  socialComments.innerHTML = '';

  // Вставляем новые комментарии
  data.comments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.appendChild(commentAvatar);
    commentElement.appendChild(commentText);

    socialComments.appendChild(commentElement);
  });

  // Показываем окно и скрываем ненужные блоки
  bigPicture.classList.remove('hidden');
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  // Закрытие по клику на кнопку
  bigPictureClose.addEventListener('click', closeBigPicture);

  // Закрытие по нажатию на Esc
  document.addEventListener('keydown', onEscPress);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscPress);
}

function onEscPress(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeBigPicture();
  }
}

// Пример данных для теста
const exampleData = {
  url: 'https://example.com/photo.jpg',
  likes: 123,
  comments: [
    {
      avatar: 'https://example.com/avatar1.jpg',
      name: 'Иван Иванов',
      message: 'Отличная фотография!'
    },
    {
      avatar: 'https://example.com/avatar2.jpg',
      name: 'Мария Петрова',
      message: 'Очень красиво!'
    }
  ],
  description: 'Это пример описания фотографии.'
};

// Открытие окна при клике на миниатюру (пример)
document.querySelector('.thumbnail').addEventListener('click', () => {
  openBigPicture(exampleData);
});
