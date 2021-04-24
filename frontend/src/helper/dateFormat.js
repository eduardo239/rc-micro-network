export function dateFormat(date_) {
  let x = new Date(date_);
  const d = x.getDate();
  const m = x.getMonth() + 1;
  const y = x.getFullYear();
  return `${d}/${m}/${y}`;
}

export function sinceDate(date_) {
  //86400000

  const today = new Date();
  const register = new Date(date_);

  const since = today.getTime() - register.getTime();

  return parseFloat(since / (24 * 1000 * 60 * 60)).toFixed(2);
}
