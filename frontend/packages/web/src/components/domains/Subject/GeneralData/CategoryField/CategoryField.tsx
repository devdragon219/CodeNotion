import { SelectField } from '@realgimm5/frontend-common/components';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllSubjectCategoriesQuery } from '../../../../../gql/RealGimm.Web.SubjectCategory.operation';
import { SubjectCategoryFormInput } from '../../../../../interfaces/FormInputs/Subject';
import { CategoryFieldProps } from './CategoryField.types';

export const CategoryField = ({ control, errors, readonly, required, useHeir }: CategoryFieldProps) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<SubjectCategoryFormInput[]>([]);
  const [getSubjectCategoriesState] = useGetAllSubjectCategoriesQuery({
    variables: {
      order: {
        name: SortEnumType.Asc,
      },
      where: {
        function: {
          neq: {
            isCompanyGroup: true,
          },
        },
        and: useHeir
          ? undefined
          : [
              {
                function: {
                  neq: {
                    isHeir: true,
                  },
                },
              },
            ],
      },
    },
  });

  useEffect(() => {
    const nodes =
      getSubjectCategoriesState.data?.subjectCategory.allSubjectCategories.map(({ id, name }) => ({
        categoryId: id,
        name,
      })) ?? [];

    setCategories(nodes);
  }, [getSubjectCategoriesState.data]);

  return (
    <Controller
      name="categories"
      control={control}
      render={({ field }) => (
        <SelectField
          {...field}
          multiple
          label={t('subject.field.category')}
          options={categories}
          error={!!errors.categories}
          helperText={errors.categories?.message}
          getOptionKey={(option) => `${option.categoryId}`}
          getOptionLabel={(option) => option.name}
          required={required}
          readonly={readonly}
        />
      )}
    />
  );
};
