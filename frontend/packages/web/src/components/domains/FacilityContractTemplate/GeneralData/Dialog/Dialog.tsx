import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractTemplateFormInput } from '../../../../../interfaces/FormInputs/FacilityContractTemplate';
import { getFacilityContractTemplateCatalogueTypesSchema } from '../../../../../utils/facilityContractTemplate/schemas/catalogueTypes';
import { FacilityContractTemplateCatalogueTypes } from '../../CatalogueTypes/CatalogueTypes';
import { CatalogueTypesDialogProps } from './Dialog.types';

export const CatalogueTypesDialog = ({ catalogueTypes, onClose, onSave }: CatalogueTypesDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractTemplateFormInput>({
    defaultValues: {
      catalogueTypes,
    },
    resolver: yupResolver(getFacilityContractTemplateCatalogueTypesSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: FacilityContractTemplateFormInput) => {
      onSave(formValues.catalogueTypes);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open title="facility_contract_template.dialog.edit_catalogue_types" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <TableProvider key="catalogue-types">
            <FacilityContractTemplateCatalogueTypes control={control} errors={errors} mode={FormMode.Edit} />
          </TableProvider>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
