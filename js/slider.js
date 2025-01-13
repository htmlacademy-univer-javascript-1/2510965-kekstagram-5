const DEFAULT_EFFECT_LEVEL = 100;
const imageForm = document.querySelector('.img-upload__form');
const slider = document.querySelector('.effect-level__slider');
const imagePreview = imageForm.querySelector('#preview');
const effectValueInput = imageForm.querySelector('.effect-level__value');

class ImageEffect {
  constructor(type, minValue, maxValue, stepValue) {
    this.type = type;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.stepValue = stepValue;
  }
}

const IMAGE_EFFECTS = {
  'effect-chrome': new ImageEffect('grayscale', 0, 1, 0.1),
  'effect-sepia': new ImageEffect('sepia', 0, 1, 0.1),
  'effect-marvin': new ImageEffect('invert', 0, 1, 0.01),
  'effect-phobos': new ImageEffect('blur', 0, 3, 0.1),
  'effect-heat': new ImageEffect('brightness', 1, 3, 0.1),
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.01,
  start: 1,
  connect: 'lower',
});

const getSliderValue = (effect) => effect.type === 'blur'
  ? `${slider.noUiSlider.get()}px`
  : `${slider.noUiSlider.get()}`;

export const resetToDefaultEffect = () => {
  slider.parentElement.classList.add('hidden');
  imagePreview.style.filter = '';
  effectValueInput.value = DEFAULT_EFFECT_LEVEL;
  document.querySelector('#effect-none').checked = true;
};

export const onHandleEffectChange = (event) => {
  if (event.target.matches('input[type=radio]')) {
    if (event.target.id === 'effect-none') {
      resetToDefaultEffect();
    } else {
      slider.parentElement.classList.remove('hidden');
      const selectedEffect = IMAGE_EFFECTS[event.target.id];
      slider.noUiSlider.updateOptions({
        range: {
          min: selectedEffect.minValue,
          max: selectedEffect.maxValue,
        },
        step: selectedEffect.stepValue,
        start: selectedEffect.maxValue,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `${selectedEffect.type}(${getSliderValue(selectedEffect)})`;
        effectValueInput.value = slider.noUiSlider.get() / selectedEffect.maxValue;
      });
    }
  }
};
