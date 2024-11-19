import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { CustomFieldType, EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CatalogueItemFormInput } from '../../../../interfaces/FormInputs/CatalogueItem';
import { getEmptyCatalogueItemFormInput } from '../../../../utils/catalogueItem/initialValues';
import { ItemFieldAccordion } from './Accordion/Accordion';
import { ItemDialog } from './Dialog/Dialog';
import { ItemDialogInput } from './Dialog/Dialog.types';
import { CatalogueItemsProps } from './Items.types';

const FIXED_ITEM_FIELDS = 1;
export const CatalogueItems = ({
  canUseInternalCodes,
  control,
  errors,
  mode,
  readonly,
  setCanUseInternalCodes,
  setValue,
}: CatalogueItemsProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const navigate = useNavigate();
  const catalogueType = useWatch({ control, name: 'catalogueType' })!;
  const estate = useWatch({ control, name: 'estate' })!;
  const { fields, append, remove, update } = useFieldArray({ control, name: 'items' });

  const [itemDialogProps, setItemDialogProps] = useState<{
    input?: ItemDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseItemDialog = useCallback(() => {
    setItemDialogProps({ open: false });
  }, []);
  const handleEditItem = useCallback(
    (index: number) => {
      setItemDialogProps({
        input: { item: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveItem = useCallback(
    (value: CatalogueItemFormInput[] | ItemDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.item);
      }
      handleCloseItemDialog();
    },
    [append, update, handleCloseItemDialog],
  );

  const handleAddItem = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyCatalogueItemFormInput(catalogueType, estate, EstateStatus.Operational));
    } else {
      setItemDialogProps({ open: true });
    }
  }, [mode, estate, catalogueType, append]);

  const handleViewItem = useCallback(
    (index: number) => {
      navigate(
        `/app/real-estate/catalogues/${catalogueType.catalogueTypeId}/${estate.id}/items/${fields[index].catalogueItemId}`,
      );
    },
    [estate, catalogueType, fields, navigate],
  );

  const internalCodes = useMemo(
    () => fields.filter((_, idx) => idx !== itemDialogProps.input?.index).map(({ internalCode }) => internalCode),
    [fields, itemDialogProps.input?.index],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create ? (
        <>
          <SectionTitle value="catalogue.section_title.item" />
          <Grid2 size={12}>
            <ItemFieldAccordion
              control={control}
              errors={errors}
              index={0}
              internalCodes={internalCodes}
              mode={mode}
              useGetInternalCode
              setCanUseInternalCodes={setCanUseInternalCodes}
              setValue={setValue}
            />
          </Grid2>
          {fields.slice(FIXED_ITEM_FIELDS).length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.slice(FIXED_ITEM_FIELDS).map(({ key }, index) => (
                  <RepeatableField key={key} index={index + FIXED_ITEM_FIELDS} onDelete={remove}>
                    <ItemFieldAccordion
                      control={control}
                      errors={errors}
                      index={index + FIXED_ITEM_FIELDS}
                      internalCodes={internalCodes}
                      mode={mode}
                      useGetInternalCode
                      setCanUseInternalCodes={setCanUseInternalCodes}
                      setValue={setValue}
                    />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
          )}
          <Grid2 size={12}>
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddItem}>
              {t('catalogue.action.add_catalogue_item')}
            </Button>
          </Grid2>
        </>
      ) : fields.length === 0 && readonly ? (
        <SectionTitle value="catalogue.text.no_catalogue_items" />
      ) : (
        <>
          {!readonly && (
            <Grid2 size={12} sx={{ textAlign: 'right' }}>
              <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddItem}>
                {t('catalogue.action.add_catalogue_item')}
              </Button>
            </Grid2>
          )}
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'catalogue.field.catalogue_item_code',
                'catalogue.field.catalogue_item_status',
                'catalogue.field.catalogue_item_activation_date',
                'catalogue.field.catalogue_item_decommissioning_date',
                'catalogue.field.catalogue_item_last_maintenance_date',
                ...(catalogueType.fields.flatMap(({ fields }) => fields.map(({ name }) => name)) as ParseKeys[]),
              ]}
              rows={fields.map((entry) => [
                entry.internalCode,
                entry.status ? t(`common.enum.estate_status.${entry.status}`) : null,
                entry.activationDate,
                entry.decommissioningDate,
                entry.lastMaintenanceDate,
                ...entry.fields.flatMap((fields) =>
                  fields.map(({ fieldType, value }) =>
                    fieldType === CustomFieldType.Date ? parseStringToLocalizedDate(value, language) : value,
                  ),
                ),
              ])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditItem}
              onRowView={handleViewItem}
            />
          </Grid2>
        </>
      )}
      {itemDialogProps.open && (
        <ItemDialog
          canUseInternalCodes={canUseInternalCodes}
          catalogueType={catalogueType}
          estate={estate}
          existingInternalCodes={internalCodes}
          input={itemDialogProps.input}
          onClose={handleCloseItemDialog}
          onSave={handleSaveItem}
          setCanUseInternalCodes={setCanUseInternalCodes}
        />
      )}
    </Grid2>
  );
};
