const arrayToHash = array => array.reduce((acc = {}, current) => {
  acc[current._id || current.id] = current;
  return acc;
}, {});
export default arrayToHash;
