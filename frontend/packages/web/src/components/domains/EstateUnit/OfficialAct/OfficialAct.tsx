import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { DeletableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitOfficialActFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEmptyEstateUnitOfficialActFormInput } from '../../../../utils/estateUnit/initialValues';
import { OfficialActDialog } from './Dialog/Dialog';
import { OfficialActField } from './Field/Field';
import { EstateUnitOfficialActProps } from './OfficialAct.types';

export const EstateUnitOfficialAct = ({ control, errors, mode, readonly, setValue }: EstateUnitOfficialActProps) => {
  const { t } = useTranslation();
  const officialAct = useWatch({ control, name: 'officialAct' });
  const [isOfficialActDialogOpen, setOfficialActDialogOpen] = useState(false);

  const handleCloseOfficialActDialog = useCallback(() => {
    setOfficialActDialogOpen(false);
  }, []);
  const handleSaveOfficialAct = useCallback(
    (officialAct: EstateUnitOfficialActFormInput) => {
      setValue('officialAct', officialAct);
      handleCloseOfficialActDialog();
    },
    [setValue, handleCloseOfficialActDialog],
  );

  const handleAddOfficialAct = useCallback(() => {
    if (mode === FormMode.Create) {
      setValue('officialAct', getEmptyEstateUnitOfficialActFormInput());
    } else {
      setOfficialActDialogOpen(true);
    }
  }, [mode, setValue]);
  const handleRemoveOfficialAct = useCallback(() => {
    setValue('officialAct', null);
  }, [setValue]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="estate_unit.section_title.official_act" />}
      {officialAct ? (
        <Grid2 size={12}>
          {readonly ? (
            <OfficialActField control={control} errors={errors} readonly={readonly} />
          ) : (
            <DeletableField iconPositionAbsolute={mode === FormMode.Create} onDelete={handleRemoveOfficialAct}>
              <OfficialActField control={control} errors={errors} readonly={readonly} />
            </DeletableField>
          )}
        </Grid2>
      ) : mode === FormMode.Edit && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="estate_unit.section_title.no_official_act" />
      ) : (
        <></>
      )}
      {!readonly && !officialAct && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddOfficialAct}>
            {t('estate_unit.action.add_official_act')}
          </Button>
        </Grid2>
      )}
      {isOfficialActDialogOpen && (
        <OfficialActDialog onClose={handleCloseOfficialActDialog} onSave={handleSaveOfficialAct} />
      )}
    </Grid2>
  );
};
