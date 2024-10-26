const checkStringLength = (str, len) => str.length <= len;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

function isPalindrome(str) {
  const strReverse = str.toLowerCase().split('').reverse().join('');
  return strReverse === str.toLowerCase();
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false


function getNumbers(input) {
  const str = String(input);

  const digits = str.match(/\d+/g);

  if (!digits) {
    return NaN;
  }

  return parseInt(digits.join(''), 10);
}


getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('агент 007'); // 7
getNumbers('а я томат'); // NaN

getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15