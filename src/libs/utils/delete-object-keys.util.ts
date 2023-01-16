export const deleteObjectKeys = (obj: any, keys: string[]) => {
  const clone = { ...obj };
  for (const key of keys) {
    delete clone[key];
  }
  return clone;
};
