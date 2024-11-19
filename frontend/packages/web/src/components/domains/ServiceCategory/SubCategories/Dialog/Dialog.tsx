import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  Dialog,
  DialogContent,
  Form,
  RepeatableField,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ServiceCategoryFormInput } from '../../../../../interfaces/FormInputs/ServiceCategory';
import { getEmptyServiceSubCategoryFormInput } from '../../../../../utils/serviceCategory/initialValues';
import { getServiceCategorySubCategoriesSchema } from '../../../../../utils/serviceCategory/schemas/subCategories';
import { SubCategoryField } from '../Field/Field';
import { SubCategoryDialogProps } from './Dialog.types';

export const SubCategoryDialog = ({
  canUseInternalCodes,
  existingInternalCodes,
  input,
  internalCode,
  name,
  onClose,
  onSave,
  setCanUseInternalCodes,
}: SubCategoryDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<ServiceCategoryFormInput>({
    defaultValues: {
      internalCode,
      name,
      subCategories: input ? [input.subcategory] : [getEmptyServiceSubCategoryFormInput()],
    },
    resolver: yupResolver(getServiceCategorySubCategoriesSchema(canUseInternalCodes, t)),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subCategories',
  });

  const handleAddSubCategory = useCallback(() => {
    append(getEmptyServiceSubCategoryFormInput());
  }, [append]);

  const internalCodes = useMemo(() => fields.map(({ internalCode }) => internalCode), [fields]);

  const onSubmit = useCallback(
    (formValues: ServiceCategoryFormInput) => {
      onSave(
        input
          ? {
              ...input,
              subcategory: formValues.subCategories[0],
            }
          : formValues.subCategories,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`service_category.dialog.sub_category.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="service_category.section_title.service_sub_category" />
            <Grid2 size={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('service_category.field.service_category')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled
                    required
                  />
                )}
              />
            </Grid2>
            {input ? (
              <Grid2 size={12}>
                <SubCategoryField
                  control={control}
                  errors={errors}
                  existingInternalCodes={existingInternalCodes}
                  index={0}
                  internalCodes={internalCodes}
                  mode={FormMode.Edit}
                  setCanUseInternalCodes={setCanUseInternalCodes}
                  setValue={setValue}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <SubCategoryField
                            control={control}
                            errors={errors}
                            existingInternalCodes={existingInternalCodes}
                            index={index}
                            internalCodes={internalCodes}
                            mode={FormMode.Create}
                            setCanUseInternalCodes={setCanUseInternalCodes}
                            setValue={setValue}
                          />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                <Grid2 size={12}>
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddSubCategory}
                  >
                    {t('service_category.action.add_sub_category')}
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
