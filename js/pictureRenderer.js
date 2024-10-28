class PictureRenderer {
    constructor(containerSelector, pictureTemplateSelector) {
      this.container = document.querySelector(containerSelector);
      this.pictureTemplate = document.querySelector(pictureTemplateSelector).content;
    }
  
    renderPictures(pictures) {
      const fragment = document.createDocumentFragment();
  
      pictures.forEach((picture) => {
        const pictureElement = this.pictureTemplate.cloneNode(true);
  
        pictureElement.querySelector('.picture__img').src = picture.url;
        pictureElement.querySelector('.picture__img').alt = picture.description;
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments;
  
        fragment.appendChild(pictureElement);
      });
  
      this.container.appendChild(fragment);
    }
  }
  
  export default PictureRenderer;