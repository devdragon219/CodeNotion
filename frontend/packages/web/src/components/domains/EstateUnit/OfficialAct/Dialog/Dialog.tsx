import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../../interfaces/FormInputs/EstateUnit';
import { getEmptyEstateUnitOfficialActFormInput } from '../../../../../utils/estateUnit/initialValues';
import { getEstateUnitOfficialActSchema } from '../../../../../utils/estateUnit/schemas/officialAct';
import { OfficialActField } from '../Field/Field';
import { OfficialActDialogProps } from './Dialog.types';

export const OfficialActDialog = ({ onClose, onSave }: OfficialActDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<EstateUnitFormInput>({
    defaultValues: {
      officialAct: getEmptyEstateUnitOfficialActFormInput(),
    },
    resolver: yupResolver(getEstateUnitOfficialActSchema(language, t)),
  });

  const onSubmit = useCallback(
    (formValues: EstateUnitFormInput) => {
      onSave(formValues.officialAct!);
    },
    [onSave],
  );

  return (
    <Dialog open onClose={onClose} title="estate_unit.dialog.official_act.title">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="estate_unit.section_title.official_act" />
            <Grid2 size={12}>
              <OfficialActField control={control} errors={errors} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
