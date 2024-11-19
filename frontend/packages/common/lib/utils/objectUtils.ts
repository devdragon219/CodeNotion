export interface ObjectInput<T> {
  [key: string]: T | ObjectInput<T>;
}
export const getValueForKey = <T>(key: string, input: T, separator = '.'): unknown => {
  if (typeof input !== 'object') {
    return undefined;
  }
  const object = input as ObjectInput<T>;

  const path = key.split(separator);
  if (path.length === 1) {
    return object[key];
  }

  const k = path[0];
  if (!!object[k] && typeof object[k] === 'object') {
    return getValueForKey(path.slice(1).join(separator), object[k]);
  }

  return undefined;
};

export interface ObjectResult<T> {
  [key: string]: T | ObjectResult<T>;
}
export const createObjectFromKey = <T>(key: string, value: T, separator = '.') => {
  const path = key.split(separator);
  if (path.length === 1) {
    return { [key]: value };
  }

  const initialValue = {
    [path.pop()!]: value,
  };
  return path.reduceRight<ObjectResult<T>>((innerObj, key) => ({ [key]: innerObj }), initialValue);
};

export const findValueForKey = <T>(key: string, input: T): unknown => {
  if (typeof input !== 'object') {
    return undefined;
  }
  const object = input as ObjectInput<T>;

  if (key in object) {
    return object[key];
  }

  for (const k in object) {
    if (typeof object[k] === 'object') {
      const value = findValueForKey(key, object[k]);
      if (value) {
        return value;
      }
    }
  }

  return undefined;
};
