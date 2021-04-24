const localStorage = (store) => (next) => (action) => {
  const response = next(action);

  const value = store.getState().ui;
  window.localStorage.setItem('theme', JSON.stringify(value));

  return response;
};

export default localStorage;
