const myPromise = new Promise<string>((_, reject) => {
  setTimeout(() => {
    reject(new Error('This is an error'));
  }, 1000);
});

myPromise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error.message);
});
