const countTotalAndAverage = (obj) => {
  let total = 0;
  let weighted = 0;
  for (let num in obj) {
    total += parseInt(obj[num]);
    weighted += parseInt(obj[num]) * parseInt(num);
  }
  const average = Math.round(weighted / total * 10) / 10;
  return [total, average];
};

export default countTotalAndAverage;