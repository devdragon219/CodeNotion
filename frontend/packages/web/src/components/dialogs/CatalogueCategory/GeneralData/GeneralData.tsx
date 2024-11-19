import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCatalogueCategory } from '../../../../hooks/useCatalogueCategory';
import { CatalogueCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';
import { getEmptyCatalogueCategoryFormInput } from '../../../../utils/catalogueCategory/initialValues';
import { getCatalogueCategoryGeneralDataSchema } from '../../../../utils/catalogueCategory/schemas/generalData';
import { CatalogueCategoryGeneralData } from '../../../domains/CatalogueCategory/GeneralData/GeneralData';
import { CatalogueCategoryGeneralDataDialogProps } from './GeneralData.types';

export const CatalogueCategoryGeneralDataDialog = ({ onClose, onSave }: CatalogueCategoryGeneralDataDialogProps) => {
  const { t } = useTranslation();
  const { getInternalCode, checkCanUseInternalCode } = useCatalogueCategory();
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CatalogueCategoryFormInput>({
    defaultValues: getEmptyCatalogueCategoryFormInput(),
    resolver: yupResolver(getCatalogueCategoryGeneralDataSchema(canUseInternalCode, t)),
  });
  const internalCode = useWatch({ control, name: 'internalCode' });
  const debouncedInternalCode = useDebounce(internalCode);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, null, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode]);

  useEffect(() => {
    getInternalCode((internalCode) => {
      setValue('internalCode', internalCode);
    });
    // eslint-disable-next-line
  }, []);

  const onSubmit = useCallback(
    (formValues: CatalogueCategoryFormInput) => {
      onSave(formValues);
    },
    [onSave],
  );

  return (
    <Dialog open title="catalogue_category.dialog.create.title" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <CatalogueCategoryGeneralData control={control} errors={errors} mode={FormMode.Create} />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
