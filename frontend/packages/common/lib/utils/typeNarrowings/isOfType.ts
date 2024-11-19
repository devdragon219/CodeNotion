export const isOfType = <T>(
  object: unknown,
  keys: (keyof T)[],
  additionalChecks: ((object: Record<keyof T, unknown>) => boolean)[] = [],
): object is T => {
  const candidateT = object as T | null | undefined;

  return (
    candidateT !== undefined &&
    candidateT !== null &&
    typeof candidateT === 'object' &&
    !keys.some((key) => !(key in candidateT)) &&
    !additionalChecks.some((check) => !check(candidateT))
  );
};

export const isArrayOfType = <T>(
  object: unknown,
  keys: (keyof T)[],
  additionalChecks: ((object: Record<keyof T, unknown>) => boolean)[] = [],
): object is T[] => {
  const candidateTArray = object as T[] | null | undefined;

  return (
    candidateTArray !== undefined &&
    candidateTArray !== null &&
    Array.isArray(candidateTArray) &&
    !candidateTArray.some((item) => !isOfType<T>(item, keys, additionalChecks))
  );
};
