import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, Loader, SecondaryTable } from '@realgimm5/frontend-common/components';
import { CustomFieldType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCatalogueQuery } from '../../../../gql/RealGimm.Web.Catalogue.operation';
import { CatalogueItemsDialogProps } from './Dialog.types';

export const CatalogueItemsDialog = ({ estateId, catalogueTypeId, onClose }: CatalogueItemsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [queryState] = useGetCatalogueQuery({
    variables: {
      catalogueTypeId,
      estateId,
    },
  });
  const catalogueItems = useMemo(() => queryState.data?.catalogue.get ?? [], [queryState.data]);

  return (
    <Dialog fullScreen open title="catalogue.tab.items" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        {queryState.fetching && <Loader />}
        {catalogueItems.length > 0 && (
          <SecondaryTable
            columns={[
              'catalogue.field.catalogue_item_code',
              'catalogue.field.catalogue_item_status',
              'catalogue.field.catalogue_item_activation_date',
              'catalogue.field.catalogue_item_decommissioning_date',
              'catalogue.field.catalogue_item_last_maintenance_date',
              ...(catalogueItems[0].fields.map((fields) => fields.name) as ParseKeys[]),
            ]}
            rows={catalogueItems.map((item) => [
              item.internalCode,
              t(`common.enum.estate_status.${item.status}`),
              parseStringToLocalizedDate(item.activationDate, language),
              parseStringToLocalizedDate(item.decommissioningDate, language),
              parseStringToLocalizedDate(item.lastMaintenanceDate, language),
              ...item.fields.map(({ type, value }) =>
                type === CustomFieldType.Date ? parseStringToLocalizedDate(value ?? null, language) : value,
              ),
            ])}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
