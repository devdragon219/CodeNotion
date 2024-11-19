import { EditTwoTone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PriceListFieldValue } from '../../../../interfaces/FieldValues/PriceList';
import { PriceListsDialog } from './Dialog/Dialog';
import { FacilityContractPriceListsProps } from './PriceLists.types';
import { FacilityContractPriceListsTransferList } from './TransferList/TransferList';

export const FacilityContractPriceLists = ({ control, errors, mode, readonly }: FacilityContractPriceListsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isPriceListsDialogOpen, setPriceListsDialogOpen] = useState(false);
  const { fields, remove, replace } = useFieldArray({
    control,
    name: 'priceLists',
  });

  const handleEditPriceLists = useCallback(() => {
    setPriceListsDialogOpen(true);
  }, []);
  const handleClosePriceListsDialog = useCallback(() => {
    setPriceListsDialogOpen(false);
  }, []);
  const handleSavePriceLists = useCallback(
    (priceLists: PriceListFieldValue[]) => {
      replace(priceLists);
      handleClosePriceListsDialog();
    },
    [replace, handleClosePriceListsDialog],
  );

  const handleViewPriceList = useCallback(
    (index: number) => {
      navigate(`/app/maintenance/price-lists/${fields[index].id}`);
    },
    [fields, navigate],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      {isPriceListsDialogOpen && (
        <PriceListsDialog priceLists={fields} onClose={handleClosePriceListsDialog} onSave={handleSavePriceLists} />
      )}
      <SectionTitle
        actions={
          mode === FormMode.Create || readonly ? undefined : (
            <Button color="secondary" variant="contained" startIcon={<EditTwoTone />} onClick={handleEditPriceLists}>
              {t('facility_contract.action.add_price_lists')}
            </Button>
          )
        }
        value="facility_contract.section_title.price_lists"
      />
      {errors.estateUnits?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.estateUnits.message} />
        </Grid2>
      )}
      <Grid2
        size={12}
        sx={mode === FormMode.Create ? { height: { xs: 'calc(100% - 38px)', sm: 'calc(100% - 46px)' } } : undefined}
      >
        {mode === FormMode.Create ? (
          <FacilityContractPriceListsTransferList control={control} />
        ) : (
          <SecondaryTable
            columns={['facility_contract.field.price_list_code', 'facility_contract.field.price_list_name']}
            rows={fields.map((entry) => [entry.internalCode, entry.name])}
            onRowDelete={readonly ? undefined : remove}
            onRowView={handleViewPriceList}
          />
        )}
      </Grid2>
    </Grid2>
  );
};
