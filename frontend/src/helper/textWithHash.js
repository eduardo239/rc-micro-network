export default function textWithHash(string) {
  let a = string.split(' ');
  a.forEach((p, i) => {
    if (p.startsWith('#')) {
      a[i] = `<a href=search/${p.replace(/[,#]/, '')}>${p}</a>`;
    }
  });
  return a.join(' ');
}
