import {
  Message
} from 'element-ui';

export default ({
  response,
}) => {
  if (response) {
    let message;
    try {
      ({ message } = response.data.message);
      if (message instanceof Object) {
        message = message.keys()
          .map(key => `${key}: ${message[key][0]}`)
          .reduce((acc, transformedMessage) => acc + transformedMessage, '');
      }
    } catch (e) {
      message = JSON.stringify(response.data);
    }
    if (response.status !== 401 && response.status !== 403) {
      // TODO: make it so it's only for the login pages
      // we don't want to display that kind of message since we pop the login
      // each time
      Message({
        type: 'error',
        message: message || response.data,
      });
    }
  }
  throw response;
};
