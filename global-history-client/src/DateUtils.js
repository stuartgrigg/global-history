export function UnpackDate(dataDate) {
  let y = Math.floor(dataDate/10000);
  const noYear = dataDate - y*10000;
  const m = Math.floor(noYear/100);
  const d = noYear%100;
  if (y < 0) {
    y -= 1;
  }
  return `${y}-${m}-${d}`;
};

export function FormDate(year, month, day) {
  return year*10000 + month*100 + day;
}