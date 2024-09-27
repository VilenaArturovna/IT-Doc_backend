export function deleteObjectKeys<
  Obj extends Record<string, any> = Record<string, any>,
>(obj: Obj, keys: (keyof Obj)[]) {
  const clone = { ...obj };
  for (const key of keys) {
    delete clone[key];
  }
  return clone;
}
