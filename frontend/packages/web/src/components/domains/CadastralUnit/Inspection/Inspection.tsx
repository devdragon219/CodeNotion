import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { DeletableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralInspectionFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getEmptyCadastralInspectionFormInput } from '../../../../utils/cadastralUnit/initialValues';
import { InspectionDialog } from './Dialog/Dialog';
import { InspectionField } from './Field/Field';
import { CadastralUnitInspectionProps } from './Inspection.types';

export const CadastralUnitInspection = ({
  control,
  deletable = true,
  errors,
  mode,
  readonly,
  setValue,
}: CadastralUnitInspectionProps) => {
  const { t } = useTranslation();
  const inspection = useWatch({ control, name: 'inspection' });
  const estateUnitType = useWatch({ control, name: 'estateUnit.type' });
  const [isInspectionDialogOpen, setInspectionDialogOpen] = useState(false);

  const handleCloseInspectionDialog = useCallback(() => {
    setInspectionDialogOpen(false);
  }, []);
  const handleSaveInspection = useCallback(
    (inspection: CadastralInspectionFormInput) => {
      setValue('inspection', inspection);
      handleCloseInspectionDialog();
    },
    [setValue, handleCloseInspectionDialog],
  );

  const handleAddInspection = useCallback(() => {
    if (mode === FormMode.Create) {
      setValue('inspection', getEmptyCadastralInspectionFormInput());
    } else {
      setInspectionDialogOpen(true);
    }
  }, [mode, setValue]);
  const handleRemoveInspection = useCallback(() => {
    setValue('inspection', null);
  }, [setValue]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="cadastral_unit.section_title.inspection" />}
      {inspection ? (
        <Grid2 size={12}>
          {readonly || !deletable ? (
            <InspectionField estateUnitType={estateUnitType} control={control} errors={errors} readonly={readonly} />
          ) : (
            <DeletableField iconPositionAbsolute={mode === FormMode.Create} onDelete={handleRemoveInspection}>
              <InspectionField estateUnitType={estateUnitType} control={control} errors={errors} readonly={readonly} />
            </DeletableField>
          )}
        </Grid2>
      ) : mode === FormMode.Edit && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="cadastral_unit.section_title.no_inspection" />
      ) : (
        <></>
      )}
      {!readonly && !inspection && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddInspection}>
            {t('cadastral_unit.action.add_inspection')}
          </Button>
        </Grid2>
      )}
      {isInspectionDialogOpen && (
        <InspectionDialog
          estateUnitType={estateUnitType}
          onClose={handleCloseInspectionDialog}
          onSave={handleSaveInspection}
        />
      )}
    </Grid2>
  );
};
