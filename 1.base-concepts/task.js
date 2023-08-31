"use strict"
function solveEquation(a, b, c) {
  let d = Math.pow(b, 2) - 4 * a * c;
  if (d < 0) {
    return [];
  } else if (d === 0) {
    let root = -b / (2 * a);
    return [root];
  } else {
    let root1 = (-b + Math.sqrt(d)) / (2 * a);
    let root2 = (-b - Math.sqrt(d)) / (2 * a)
    return [root1, root2];
  }
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if (typeof percent !== 'number' || typeof contribution !== 'number' || typeof amount !== 'number' || typeof countMonths !== 'number') {
    return false;
  }
const monthlyPercent = percent / 100 / 12;
const creditAmount = amount - contribution;
const monthlyPayment = creditAmount * (monthlyPercent + (monthlyPercent / (Math.pow(1 + monthlyPercent, countMonths) - 1)));
const totalPayment = monthlyPayment * countMonths;
const roundedTotalPayment = Math.round(totalPayment * 100) / 100;
return roundedTotalPayment;
  }

