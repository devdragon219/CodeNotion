/* eslint-disable no-restricted-imports */
import { useMemo } from 'react';
import {
  FieldArrayPath,
  FieldArrayWithId,
  FieldPath,
  FieldValues,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  useFieldArray as useRHKFieldArray,
  useWatch,
} from 'react-hook-form';

const FieldArrayKeyName = 'key';
type TFieldArrayKeyName = typeof FieldArrayKeyName;

export const useFieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
  control,
  name,
}: UseFieldArrayProps<TFieldValues, TFieldArrayName, TFieldArrayKeyName>): UseFieldArrayReturn<
  TFieldValues,
  TFieldArrayName,
  TFieldArrayKeyName
> => {
  const { fields: arrayFields, ...methods } = useRHKFieldArray({
    control,
    name,
    keyName: FieldArrayKeyName,
  });
  const watchedFields = useWatch({ control, name: name as FieldPath<TFieldValues> });
  const fields = useMemo(
    () =>
      arrayFields.map<FieldArrayWithId<TFieldValues, TFieldArrayName, TFieldArrayKeyName>>((field, index) => ({
        ...field,
        ...watchedFields[index],
      })),
    [arrayFields, watchedFields],
  );

  return {
    ...methods,
    fields,
  };
};
