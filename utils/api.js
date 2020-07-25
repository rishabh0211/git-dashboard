export const fetch_retry = (url, options, n) => {
  return new Promise(function (resolve, reject) {
    fetch(url, options).then(resolve)
      .catch(function (error) {
        if (n === 1) return reject(error);
        resolve(fetch_retry(url, options, n - 1)); // <--- clean, isn't it?
      });
  });
};