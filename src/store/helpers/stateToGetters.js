export default (stateObject) => {
  const getters = {};
  const getterFn = key => state => state[key];
  Object.keys(stateObject).forEach((key) => {
    getters[key] = getterFn(key);
  });
  return getters;
};
