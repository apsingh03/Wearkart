function convertDate(date) {
  return Date(date).substring(0, 25);
}

module.exports = {
  convertDate,
};
