const debounce = (fn, debounceTime) => {
  let delay;
  return function (...args) {
    clearTimeout(delay);
    delay = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};
