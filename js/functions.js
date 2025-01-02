const checkLength = (string = '', maxLength = 1) => (string.length <= maxLength);
const checkPalindrome = function (string = '') {
  string = string.toLowerCase().replaceAll(' ', '');
  let result = '';
  for (let i = string.length - 1; i >= 0; i--) {
    result += string[i];
  }
  return result === string;
};


const findNumbers = function (string) {
  let result = '';
  if (!string.isNaN) {
    string = string.toString();
  }
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= 0 && string[i] <= 9) {
      result += string[i];
    }
  }
  return parseInt(result.replaceAll(' ', ''), 10);
};

checkLength();
checkPalindrome();
findNumbers();

const normalizeType = function (array) {
  if (array[0][0] === '0') {
    array[0] = String(array[0]).substring(1);
  }
  if (array[1][0] === '0' && array[1].length === 2) {
    array[1] = String(array[1]).substring(1);
  }
  return array;
};

const timeToMinutes = function (array) {
  return (+array[0] * 60 + +array[1]);
};

const isOutOfBounds = function (workdayStartTime = '', workdayEndTime = '',
  meetingStartTime = '', meetingDuration = 0) {
  const workStartTime = timeToMinutes(normalizeType(workdayStartTime.split(':')));
  const workEndTime = timeToMinutes(normalizeType(workdayEndTime.split(':')));
  const meetStartTime = timeToMinutes(normalizeType(meetingStartTime.split(':')));

  if (workStartTime > meetStartTime) {
    return false;
  } else {
    if (meetStartTime + meetingDuration <= workEndTime) {
      return true;
    }
  }
  return false;
};

isOutOfBounds();