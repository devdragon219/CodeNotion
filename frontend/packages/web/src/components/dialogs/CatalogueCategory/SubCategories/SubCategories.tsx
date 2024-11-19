import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';
import { getEmptyCatalogueSubCategoryFormInput } from '../../../../utils/catalogueCategory/initialValues';
import { getCatalogueCategorySubCategoriesSchema } from '../../../../utils/catalogueCategory/schemas/subCategories';
import { CatalogueCategorySubCategories } from '../../../domains/CatalogueCategory/SubCategories/SubCategories';
import { CatalogueCategorySubCategoriesDialogProps } from './SubCategories.types';

export const CatalogueCategorySubCategoriesDialog = ({
  input,
  mode,
  readonly,
  useSubCategories,
  onClose,
  onSave,
}: CatalogueCategorySubCategoriesDialogProps) => {
  const { t } = useTranslation();
  const [canUseInternalCodes, setCanUseInternalCodes] = useState<Record<string, boolean>>({});
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CatalogueCategoryFormInput>({
    defaultValues: {
      ...input,
      subCategories: useSubCategories ? input.subCategories : [getEmptyCatalogueSubCategoryFormInput()],
    },
    resolver: yupResolver(getCatalogueCategorySubCategoriesSchema(canUseInternalCodes, t)),
  });

  const onSubmit = useCallback(
    ({ subCategories }: CatalogueCategoryFormInput) => {
      onSave?.({
        ...input,
        subCategories: [...input.subCategories, ...subCategories],
      });
    },
    [input, onSave],
  );

  return (
    <Dialog
      open
      title={`catalogue_category.dialog.sub_category.${mode === FormMode.Create ? 'add' : 'view'}`}
      onClose={onClose}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(mode === FormMode.Create ? { type: 'submit' } : { onClick: onClose })}
            >
              {t(mode === FormMode.Create ? 'common.button.save' : 'core.button.close')}
            </Button>
          }
        >
          <CatalogueCategorySubCategories
            canUseInternalCodes={canUseInternalCodes}
            control={control}
            errors={errors}
            mode={mode}
            readonly={readonly}
            setCanUseInternalCodes={setCanUseInternalCodes}
            setValue={setValue}
          />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
