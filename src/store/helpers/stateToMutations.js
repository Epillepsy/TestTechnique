import ChangeCase from 'change-case';
import VueCookie from 'vue-cookie';

export default (stateObject, options) => {
  // default is the the cookie name from the env from webpack (vue-cli)
  const cookieName = stateObject.tokenCookie;
  const mutations = {};
  const h = window.location.hostname.split('.').reverse();
  let domain = '';
  // set cookie
  if (h.length > 2 && h[1].length <= 3 && h[0].length <= 2) {
    domain = `.${h[2]}.${h[1]}.${h[0]}`;
  } else {
    domain = `.${h[1]}.${h[0]}`;
  }

  const setterFn = (key, defaultValue) => (state, value) => {
    const newState = Object.assign({}, state);
    let localValue = value;
    if (value === undefined) {
      if (typeof (defaultValue) === 'boolean') {
        localValue = !defaultValue;
      }
      if (typeof (defaultValue) === 'number') {
        localValue = 0;
      }
      if (typeof (defaultValue) === 'string') {
        localValue = '';
      }
      if (typeof (defaultValue) === 'object'
          && Object.prototype.hasOwnProperty.call(defaultValue, 'length')) {
        localValue = [];
      }
    }

    if (key === 'tokenCookie') {
      VueCookie.set(cookieName, localValue._id, {
        expires: value.expiration_date,
        domain,
      });
      newState[key] = localValue._id;
    } else if (typeof (localValue) === 'object'
                && options && options.dynamicObjects
                && options.dynamicObjects.indexOf(key) !== -1) {
      newState[key] = JSON.parse(JSON.stringify(Object.assign({}, newState[key], localValue)));
    } else {
      newState[key] = JSON.parse(JSON.stringify(localValue));
    }

    Object.assign(state, newState);
  };

  const resetterFn = (key, defaultValue) => (state) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState[key] = defaultValue;
    if (key === 'tokenCookie') {
      VueCookie.delete(cookieName, {
        domain,
      });

      // for the reset!
      newState[key] = '';
      newState.token = {};
    }

    Object.assign(state, newState);
  };

  Object.keys(stateObject).forEach((key) => {
    const upperKey = ChangeCase.upperCase(ChangeCase.snakeCase(ChangeCase.noCase(key)));
    mutations[`SET_${upperKey}`] = setterFn(key, stateObject[key]);
    mutations[`UNSET_${upperKey}`] = resetterFn(key, stateObject[key]);
  });

  // add RESET_STATE mutation
  mutations.RESET_STATE = (state) => {
    // because we go there on reset we don't remove cookie BEWARE
    const copyStateObject = stateObject;
    if (options) {
      if (options.fieldToKeepOnResetState) {
        options.fieldToKeepOnResetState.forEach(
          field => delete copyStateObject[field],
        );
      }
    }

    // reset all fields but the ones we don' t want to
    Object.assign(state, stateObject);
  };

  return mutations;
};
