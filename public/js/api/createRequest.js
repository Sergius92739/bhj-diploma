/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.responseType = "json";
  xhr.onload = () => {
    options.callback(null, xhr.response)
  }

  if (options.headers) {
    for (let key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
  }

  if (options.method == "GET") {
    options.url += "?";
    for (let key in options.data) {
      options.url += `${key}=${options.data[key]}&`
    }
    options.url = options.url.slice(0, options.url.length - 1);
  } 
  
  try {
    xhr.open(options.method, options.url);
    if (options.method == "GET") {
      xhr.send();
    } else {
      const formData = new FormData();
      for (let key in options.data) {
        formData.append(key, options.data[key])
      }
      xhr.send(formData);
    }
  }
  catch (err) {
    options.callback(err, null)
  }
}

