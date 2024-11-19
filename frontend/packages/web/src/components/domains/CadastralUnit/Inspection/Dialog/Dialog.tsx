import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';
import { getEmptyCadastralInspectionFormInput } from '../../../../../utils/cadastralUnit/initialValues';
import { getCadastralUnitInspectionSchema } from '../../../../../utils/cadastralUnit/schemas/inspection';
import { InspectionField } from '../Field/Field';
import { InspectionDialogProps } from './Dialog.types';

export const InspectionDialog = ({ estateUnitType, onClose, onSave }: InspectionDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: {
      inspection: getEmptyCadastralInspectionFormInput(),
    },
    resolver: yupResolver(getCadastralUnitInspectionSchema(language, t)),
  });

  const onSubmit = useCallback(
    (formValues: CadastralUnitFormInput) => {
      onSave(formValues.inspection!);
    },
    [onSave],
  );

  return (
    <Dialog open onClose={onClose} title="cadastral_unit.dialog.inspection.title">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="cadastral_unit.section_title.inspection" />
            <Grid2 size={12}>
              <InspectionField estateUnitType={estateUnitType} control={control} errors={errors} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
