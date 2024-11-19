import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Form } from '@realgimm5/frontend-common/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UtilityServiceFormInput } from '../../../../../interfaces/FormInputs/UtilityService';
import { getEmptyUtilityServiceFormInput } from '../../../../../utils/utilityService/initialValues';
import { getUtilityServiceEstateUnitsSchema } from '../../../../../utils/utilityService/schemas/estateUnits';
import { UtilityServiceEstateUnitsDialogProps } from './Dialog.types';
import { EstateUnitsField } from './Field/Field';

export const UtilityServiceEstateUnitsDialog = ({
  currentEstateUnits,
  currentEstates,
  onClose,
  onSave,
}: UtilityServiceEstateUnitsDialogProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<UtilityServiceFormInput>({
    defaultValues: getEmptyUtilityServiceFormInput(),
    resolver: yupResolver(getUtilityServiceEstateUnitsSchema(t)),
  });

  return (
    <Dialog fullScreen open title="utility_service.dialog.estate_units" onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSave)}>
        <DialogContent
          fixedHeight
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <EstateUnitsField control={control} currentEstateUnits={currentEstateUnits} currentEstates={currentEstates} />
        </DialogContent>
      </Form>
    </Dialog>
  );
};
