const imageInput = document.querySelector('.img-upload__input');
const mainPreview = document.querySelector('#preview');
const filtersPreview = document.querySelectorAll('.effects__preview');
const updatePreview = () => {
  const selectedFile = imageInput.files[0];
  const imageUrl = URL.createObjectURL(selectedFile);
  mainPreview.src = imageUrl;
  filtersPreview.forEach((filterElement) => {
    filterElement.style.backgroundImage = `url(${imageUrl})`;
  });
};
export { updatePreview };
