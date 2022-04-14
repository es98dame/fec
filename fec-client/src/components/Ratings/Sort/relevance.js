import moment from 'moment';

const dateIndex = (date) => {
  const days = [365, 180, 30, 7, 2];
  const weights = [1, 2, 3, 6, 10, 15];
  const then = moment(date);
  const now = moment();
  const daysAgo = now.diff(then, 'days');
  for (let i = 0; i < days.length; i++) {
    if (daysAgo > days[i]) {
      return weights[i];
    }
  }
  return weights[5];
};

const relevance = (a, b) => {
  const indexA = dateIndex(a.date);
  const indexB = dateIndex(b.date);
  return indexB * (b.helpfulness + 1) - indexA * (a.helpfulness + 1);
};

export default relevance;