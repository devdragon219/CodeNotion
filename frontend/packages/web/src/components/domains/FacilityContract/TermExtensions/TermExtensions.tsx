import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { EmptyText, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FacilityContractTermExtensionFormInput } from '../../../../interfaces/FormInputs/FacilityContract';
import { TermExtensionDialog } from './Dialog/Dialog';
import { TermExtensionDialogInput } from './Dialog/Dialog.types';
import { FacilityContractTermExtensionsProps } from './TermExtensions.types';

export const FacilityContractTermExtensions = ({ control, readonly }: FacilityContractTermExtensionsProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'termExtensions' });
  const [termExtensionDialogProps, setTermExtensionDialogProps] = useState<{
    input?: TermExtensionDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseTermExtensionDialog = useCallback(() => {
    setTermExtensionDialogProps({ open: false });
  }, []);
  const handleEditTermExtension = useCallback(
    (index: number) => {
      setTermExtensionDialogProps({ input: { termExtension: fields[index], index }, open: true });
    },
    [fields],
  );
  const handleSaveTermExtension = useCallback(
    (value: FacilityContractTermExtensionFormInput | TermExtensionDialogInput) => {
      if ('index' in value) {
        update(value.index, value.termExtension);
      } else {
        append(value);
      }
      handleCloseTermExtensionDialog();
    },
    [append, update, handleCloseTermExtensionDialog],
  );

  const handleAddTermExtension = useCallback(() => {
    setTermExtensionDialogProps({ open: true });
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          !readonly ? (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleAddTermExtension}
            >
              {t('facility_contract.action.add_term_extension')}
            </Button>
          ) : undefined
        }
        value="facility_contract.section_title.term_extensions"
      />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'facility_contract.field.term_extension_days',
              'facility_contract.field.term_extension_fee',
              'facility_contract.field.term_extension_notes',
            ]}
            rows={fields.map((entry) => [entry.daysCount, entry.feeDifference, entry.notes])}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditTermExtension}
          />
        </Grid2>
      ) : readonly ? (
        <EmptyText value="facility_contract.text.no_term_extensions" />
      ) : (
        <></>
      )}
      {termExtensionDialogProps.open && (
        <TermExtensionDialog
          input={termExtensionDialogProps.input}
          onClose={handleCloseTermExtensionDialog}
          onSave={handleSaveTermExtension}
        />
      )}
    </Grid2>
  );
};
