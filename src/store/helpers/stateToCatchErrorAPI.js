import ChangeCase from 'change-case';
import catchMessage from '@/store/helpers/catchMessage';

export default (stateObject) => {
  const mutations = [];
  Object.keys(stateObject).forEach((key) => {
    const upperKey = ChangeCase.upperCase(ChangeCase.snakeCase(ChangeCase.noCase(key)));
    mutations.push(`UNSET_${upperKey}`);
  });
  return context => ({ response }) => {
    mutations.map(mutation => context.commit(mutation));
    return catchMessage({ response });
  };
};
