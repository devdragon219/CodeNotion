import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getFacilityContractPriceListsSchema } from '../../../../../utils/facilityContract/schemas/priceLists';
import { FacilityContractPriceListsTransferList } from '../TransferList/TransferList';
import { PriceListsDialogProps } from './Dialog.types';

export const PriceListsDialog = ({ priceLists, onClose, onSave }: PriceListsDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractFormInput>({
    defaultValues: {
      priceLists: [],
    },
    resolver: yupResolver(getFacilityContractPriceListsSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: FacilityContractFormInput) => {
      onSave(formValues.priceLists);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open title="facility_contract.dialog.add_price_lists" onClose={onClose}>
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
            <SectionTitle value="facility_contract.section_title.price_lists" />
            {errors.estateUnits?.message && (
              <Grid2 size={12}>
                <Alert severity="error" message={errors.estateUnits.message} />
              </Grid2>
            )}
            <Grid2 size={12}>
              <FacilityContractPriceListsTransferList
                control={control}
                where={{
                  id: {
                    nin: priceLists.map(({ id }) => id),
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
