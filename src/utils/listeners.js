export const addListener = (eventName, callback) => {
  window.addEventListener(eventName, callback);
};

export const removeListener = (eventName, callback) => {
  window.removeEventListener(eventName, callback);
};
