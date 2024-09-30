function calculateProductDiscount(mrp, percent) {
  let discount = (mrp * percent) / 100;
  let discountedPrice = parseInt(mrp - discount);
  return (
    discountedPrice &&
    discountedPrice.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR',
    })
  );
}

function convertInInr(no) {
  return (
    no &&
    no.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR',
    })
  );
}

module.exports = {
  calculateProductDiscount,
  convertInInr,
};
