import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueSubCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';
import { getEmptyCatalogueSubCategoryFormInput } from '../../../../utils/catalogueCategory/initialValues';
import { SubCategoryDialog } from './Dialog/Dialog';
import { SubCategoryDialogInput } from './Dialog/Dialog.types';
import { SubCategoryField } from './Field/Field';
import { CatalogueCategorySubCategoriesProps } from './SubCategories.types';

const FIXED_SUB_CATEGORY_FIELDS = 1;

export const CatalogueCategorySubCategories = ({
  canUseInternalCodes,
  control,
  errors,
  mode,
  readonly,
  setCanUseInternalCodes,
  setValue,
}: CatalogueCategorySubCategoriesProps) => {
  const { t } = useTranslation();
  const internalCode = useWatch({ control, name: 'internalCode' });
  const name = useWatch({ control, name: 'name' });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'subCategories' });

  const [subCategoryDialogProps, setSubCategoryDialogProps] = useState<{
    input?: SubCategoryDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseSubCategoryDialog = useCallback(() => {
    setSubCategoryDialogProps({ open: false });
  }, []);
  const handleEditSubCategory = useCallback(
    (index: number) => {
      setSubCategoryDialogProps({
        input: { subcategory: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveSubCategory = useCallback(
    (value: CatalogueSubCategoryFormInput[] | SubCategoryDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.subcategory);
      }
      handleCloseSubCategoryDialog();
    },
    [append, update, handleCloseSubCategoryDialog],
  );

  const handleAddSubCategory = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyCatalogueSubCategoryFormInput());
    } else {
      setSubCategoryDialogProps({ open: true });
    }
  }, [mode, append]);

  const internalCodes = useMemo(
    () =>
      fields.filter((_, idx) => idx !== subCategoryDialogProps.input?.index).map(({ internalCode }) => internalCode),
    [fields, subCategoryDialogProps.input?.index],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create ? (
        <>
          <SectionTitle value="catalogue_category.section_title.catalogue_sub_category" />
          <Grid2 size={12}>
            <SubCategoryField
              control={control}
              errors={errors}
              index={0}
              internalCodes={internalCodes}
              mode={mode}
              setCanUseInternalCodes={setCanUseInternalCodes}
              setValue={setValue}
            />
          </Grid2>
          {fields.slice(FIXED_SUB_CATEGORY_FIELDS).length !== 0 && (
            <Grid2 size={12}>
              <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                {fields.slice(FIXED_SUB_CATEGORY_FIELDS).map(({ key }, index) => (
                  <RepeatableField key={key} index={index + FIXED_SUB_CATEGORY_FIELDS} onDelete={remove}>
                    <SubCategoryField
                      control={control}
                      errors={errors}
                      index={index + FIXED_SUB_CATEGORY_FIELDS}
                      internalCodes={internalCodes}
                      mode={mode}
                      setCanUseInternalCodes={setCanUseInternalCodes}
                      setValue={setValue}
                    />
                  </RepeatableField>
                ))}
              </Stack>
            </Grid2>
          )}
        </>
      ) : fields.length !== 0 ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'catalogue_category.field.catalogue_sub_category_code',
              'catalogue_category.field.catalogue_sub_category_name',
            ]}
            rows={fields.map((entry) => [entry.internalCode, entry.name])}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditSubCategory}
          />
        </Grid2>
      ) : readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="catalogue_category.text.no_sub_categories" />
      ) : (
        <></>
      )}
      {subCategoryDialogProps.open && (
        <SubCategoryDialog
          canUseInternalCodes={canUseInternalCodes}
          existingInternalCodes={internalCodes}
          input={subCategoryDialogProps.input}
          internalCode={internalCode}
          name={name}
          onClose={handleCloseSubCategoryDialog}
          onSave={handleSaveSubCategory}
          setCanUseInternalCodes={setCanUseInternalCodes}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddSubCategory}>
            {t('catalogue_category.action.add_sub_category')}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};