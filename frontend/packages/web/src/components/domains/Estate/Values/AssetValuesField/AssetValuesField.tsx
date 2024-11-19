import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { EmptyText, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateAssetValueFormInput } from '../../../../../interfaces/FormInputs/Estate';
import { AssetValuesFieldProps } from './AssetValuesField.types';
import { AssetValuesDialog } from './Dialog/Dialog';
import { AssetValuesDialogInput } from './Dialog/Dialog.types';

export const AssetValuesField = ({ control, readonly }: AssetValuesFieldProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'assetValues' });

  const [assetValuesDialogProps, setAssetValuesDialogProps] = useState<{
    input?: AssetValuesDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseAssetValuesDialog = useCallback(() => {
    setAssetValuesDialogProps({ open: false });
  }, []);
  const handleEditAssetValue = useCallback(
    (index: number) => {
      setAssetValuesDialogProps({
        input: { assetValue: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveAssetValues = useCallback(
    (value: EstateAssetValueFormInput[] | AssetValuesDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.assetValue);
      }
      handleCloseAssetValuesDialog();
    },
    [append, update, handleCloseAssetValuesDialog],
  );

  const handleAddAssetValues = useCallback(() => {
    setAssetValuesDialogProps({ open: true });
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="estate.section_title.asset_values" />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'estate.field.asset_value_year',
              'estate.field.asset_value_rba',
              'estate.field.asset_value_ias',
              'estate.field.asset_value_depreciation',
              'estate.field.asset_value_transfer_in',
              'estate.field.asset_value_reclamation_interventions',
            ]}
            rows={fields.map((entry) => [
              entry.year,
              entry.rba,
              entry.ias,
              parseNumberToCurrency(entry.depreciation, language),
              entry.transferYear,
              entry.reclamationInterventions,
            ])}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditAssetValue}
          />
        </Grid2>
      ) : (
        <EmptyText value="estate.text.no_asset_values" />
      )}
      {assetValuesDialogProps.open && (
        <AssetValuesDialog
          input={assetValuesDialogProps.input}
          onClose={handleCloseAssetValuesDialog}
          onSave={handleSaveAssetValues}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddAssetValues}>
            {t('estate.action.add_asset_values')}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
