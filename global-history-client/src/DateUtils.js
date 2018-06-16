export function UnpackDate(dataDate) {
  const y = Math.floor(dataDate/10000);
  const noYear = dataDate - y*10000;
  const m = Math.floor(noYear/100);
  const d = noYear%100;
  return `${y}-${m}-${d}`;
};

export function FormDate(year, month, day) {
  return year*10000 + month*100 + day;
}