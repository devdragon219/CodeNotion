import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';
import { getEstateUnitGroupEstateUnitsSchema } from '../../../../utils/estateUnitGroup/schemas/estateUnits';
import { EstateUnitGroupEstateUnitsField } from '../../../domains/EstateUnitGroup/EstateUnitsField/EstateUnitsField';
import { EstateUnitGroupEstateUnitsDialogProps } from './EstateUnits.types';

export const EstateUnitGroupEditEstateUnitsDialog = ({
  estateUnitGroup,
  onClose,
  onSave,
}: EstateUnitGroupEstateUnitsDialogProps) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EstateUnitGroupFormInput>({
    defaultValues: {
      ...estateUnitGroup,
      estateUnits: [],
    },
    resolver: yupResolver(getEstateUnitGroupEstateUnitsSchema(t)),
  });

  const onSubmit = useCallback(
    ({ estateUnits }: EstateUnitGroupFormInput) => {
      onSave(estateUnits);
    },
    [onSave],
  );

  return (
    <Dialog fullScreen open title="estate_unit_group.dialog.estate_units.add" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
          fixedHeight
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            {errors.estateUnits?.message && (
              <Grid2 size={12}>
                <Alert severity="error" message={errors.estateUnits.message} />
              </Grid2>
            )}
            <Grid2 size={12}>
              <EstateUnitGroupEstateUnitsField
                control={control}
                where={{
                  id: {
                    nin: estateUnitGroup.estateUnits.map(({ id }) => id),
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
