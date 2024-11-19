import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractCatalogueTypesSchema } from '../../../../../utils/facilityContract/schemas/catalogueTypes';
import { FacilityContractCatalogueTypesField } from '../Field/Field';
import { CatalogueTypesDialogProps } from './Dialog.types';

export const CatalogueTypesDialog = ({ catalogueTypes, estateUnits, onClose, onSave }: CatalogueTypesDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractFormInput>({
    defaultValues: {
      catalogueTypes,
      estateUnits,
    },
    resolver: yupResolver(getFacilityContractCatalogueTypesSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: FacilityContractFormInput) => {
      onSave(formValues.catalogueTypes);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open title="facility_contract.dialog.edit_catalogue_types" onClose={onClose}>
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
            <Grid2 container spacing={{ xs: 2, sm: 3 }}>
              <SectionTitle value="facility_contract.section_title.catalogue_types" />
              {errors.catalogueTypes?.message && (
                <Grid2 size={12}>
                  <Alert severity="error" message={errors.catalogueTypes.message} />
                </Grid2>
              )}
              <Grid2 size={12}>
                <FacilityContractCatalogueTypesField control={control} />
              </Grid2>
            </Grid2>
          </TableProvider>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
