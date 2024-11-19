import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractEstateUnitsSchema } from '../../../../../utils/facilityContract/schemas/estateUnits';
import { FacilityContractEstateUnitsTransferList } from '../TransferList/TransferList';
import { EstateUnitsDialogProps } from './Dialog.types';

export const EstateUnitsDialog = ({ estateUnits, estateUnitGroup, onClose, onSave }: EstateUnitsDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractFormInput>({
    defaultValues: {
      estateUnits: [],
      originalEstateUnitGroup: estateUnitGroup,
    },
    resolver: yupResolver(getFacilityContractEstateUnitsSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: FacilityContractFormInput) => {
      onSave(formValues.estateUnits);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open title="facility_contract.dialog.add_estate_units" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="facility_contract.section_title.estate_units" />
            {errors.estateUnits?.message && (
              <Grid2 size={12}>
                <Alert severity="error" message={errors.estateUnits.message} />
              </Grid2>
            )}
            <Grid2 size={12}>
              <FacilityContractEstateUnitsTransferList
                control={control}
                where={{
                  id: {
                    nin: estateUnits.map(({ id }) => id),
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
