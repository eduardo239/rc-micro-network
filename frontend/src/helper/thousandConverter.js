export function thousand_converter(int) {
  if (int > 999 && int < 1000000) {
    return (int / 1000).toFixed(1) + 'K';
  } else if (int > 999999 && int < 1000000000) {
    return (int / 1000000).toFixed(1) + 'M';
  } else {
    return int;
  }
}
