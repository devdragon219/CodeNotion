import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeActivityFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { getEmptyCatalogueTypeActivityFormInput } from '../../../../utils/catalogueType/initialValues';
import { CatalogueTypeActivitiesProps } from './Activities.types';
import { ActivityDialog } from './Dialog/Dialog';
import { ActivityDialogInput } from './Dialog/Dialog.types';
import { ActivityField } from './Field/Field';

export const CatalogueTypeActivities = ({ control, errors, mode, readonly }: CatalogueTypeActivitiesProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'activities' });

  const [activityDialogProps, setActivityDialogProps] = useState<{
    input?: ActivityDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseActivityDialog = useCallback(() => {
    setActivityDialogProps({ open: false });
  }, []);
  const handleEditActivity = useCallback(
    (index: number) => {
      setActivityDialogProps({
        input: { activity: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveActivity = useCallback(
    (value: CatalogueTypeActivityFormInput[] | ActivityDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.activity);
      }
      handleCloseActivityDialog();
    },
    [append, update, handleCloseActivityDialog],
  );

  const handleAddActivity = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyCatalogueTypeActivityFormInput());
    } else {
      setActivityDialogProps({ open: true });
    }
  }, [mode, append]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="catalogue_type.section_title.activities" />}
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <ActivityField control={control} errors={errors} index={index} readonly={readonly} />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
            <SecondaryTable
              columns={[
                'catalogue_type.field.activity_type',
                'catalogue_type.field.activity_name',
                'catalogue_type.field.activity_mandatory_by_law',
              ]}
              rows={fields.map((entry) => [
                entry.activityType ? t(`common.enum.catalogue_type_activity_type.${entry.activityType}`) : null,
                entry.name,
                entry.isMandatoryByLaw,
              ])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditActivity}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit && readonly ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="catalogue_type.text.no_activities" />
      ) : (
        <></>
      )}
      {activityDialogProps.open && (
        <ActivityDialog
          input={activityDialogProps.input}
          onClose={handleCloseActivityDialog}
          onSave={handleSaveActivity}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddActivity}>
            {t('catalogue_type.action.add_activity')}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
