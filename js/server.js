const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const request = (route, method = 'GET', body = null, onSuccess, onError) =>
  fetch(
    `${BASE_URL}${route}`, {method: method, body: body}
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(onError);
const fetchPhotos = (onSuccess, onError) => request('/data', 'GET', null, onSuccess, onError);
const sendPhotos = (body, onSuccess, onError) => request('/', 'POST', body, onSuccess, onError);
export {fetchPhotos, sendPhotos};