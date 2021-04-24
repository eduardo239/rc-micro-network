const getLocalStorage = (key, initial = null) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return initial;
  }
};
export default getLocalStorage;
