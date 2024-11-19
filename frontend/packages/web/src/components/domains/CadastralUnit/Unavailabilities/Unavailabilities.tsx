import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CadastralUnavailabilityFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { UnavailabilityDialog } from './Dialog/Dialog';
import { UnavailabilityDialogInput } from './Dialog/Dialog.types';
import { CadastralUnitUnavailabilitiesProps } from './Unavailabilities.types';

export const CadastralUnitUnavailabilities = ({ control, readonly }: CadastralUnitUnavailabilitiesProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'unavailabilities' });

  const [unavailabilityDialogProps, setUnavailabilityDialogProps] = useState<{
    input?: UnavailabilityDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseUnavailabilityDialog = useCallback(() => {
    setUnavailabilityDialogProps({ open: false });
  }, []);
  const handleEditUnavailability = useCallback(
    (index: number) => {
      setUnavailabilityDialogProps({
        input: { unavailability: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveUnavailability = useCallback(
    (value: CadastralUnavailabilityFormInput[] | UnavailabilityDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.unavailability);
      }
      handleCloseUnavailabilityDialog();
    },
    [append, update, handleCloseUnavailabilityDialog],
  );

  const handleAddUnavailability = useCallback(() => {
    setUnavailabilityDialogProps({ open: true });
  }, []);
  const handleRemoveUnavailability = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'cadastral_unit.field.unavailability_since',
              'cadastral_unit.field.unavailability_until',
              'cadastral_unit.field.notes',
            ]}
            rows={fields.map((entry) => [entry.since, entry.until, entry.notes])}
            onRowDelete={readonly ? undefined : handleRemoveUnavailability}
            onRowEdit={readonly ? undefined : handleEditUnavailability}
          />
        </Grid2>
      ) : readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="cadastral_unit.section_title.no_unavailability" />
      ) : (
        <></>
      )}
      {unavailabilityDialogProps.open && (
        <UnavailabilityDialog
          input={unavailabilityDialogProps.input}
          onClose={handleCloseUnavailabilityDialog}
          onSave={handleSaveUnavailability}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleAddUnavailability}
          >
            {t('cadastral_unit.action.add_unavailability')}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
