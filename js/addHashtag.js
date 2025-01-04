import { isElementFocused } from './utils.js';
import { closeModal } from './form.js';

const MAX_TAG_COUNT = 5;
const TAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

export const validateCommentLength = (input) => {
  const trimmedInput = input.trim();
  return trimmedInput.length <= 140;
};

export const areTagsUnique = (tags) => {
  const lowerCaseTags = tags.toLowerCase()
    .split(' ')
    .filter((tag) => tag);
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

export const handleKeyDown = (event) => {
  if (event.key === 'Escape' &&
    !(isElementFocused('text__description') || isElementFocused('text__hashtags')) &&
    !document.querySelector('.error')
  ) {
    closeModal();
  }
};

export const isTagCountValid = (input) => {
  const tagArray = input.toLowerCase()
    .split(' ')
    .filter((tag) => tag);
  return tagArray.length <= MAX_TAG_COUNT;
};

export const validateTags = (input) => {
  const tagsArray = input.toLowerCase()
    .split(' ')
    .filter((tag) => tag);
  return tagsArray.every((tag) => TAG_PATTERN.test(tag));
};

