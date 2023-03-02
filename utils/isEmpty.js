export const isEmpty = (obj) => {
  return (typeof obj === "undefined") || (Object.keys(obj).length === 0);
}