import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { EmptyText, RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WorkerFormInput } from '../../../interfaces/FormInputs/Worker';
import { getEmptyWorkerFormInput } from '../../../utils/components/worker/initialValues';
import { WorkerDialog } from './Dialog/Dialog';
import { WorkerDialogInput } from './Dialog/Dialog.types';
import { WorkerField } from './Field/Field';
import { WorkersProps } from './Workers.types';

export const Workers = ({ control, errors, mode, readonly }: WorkersProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'workers' });
  const [workerDialogProps, setWorkerDialogProps] = useState<{
    input?: WorkerDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseWorkerDialog = useCallback(() => {
    setWorkerDialogProps({ open: false });
  }, []);
  const handleEditWorker = useCallback(
    (index: number) => {
      setWorkerDialogProps({ input: { worker: fields[index], index }, open: true });
    },
    [fields],
  );
  const handleSaveWorker = useCallback(
    (value: WorkerFormInput[] | WorkerDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.worker);
      }
      handleCloseWorkerDialog();
    },
    [append, update, handleCloseWorkerDialog],
  );

  const handleAddWorker = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyWorkerFormInput());
    } else {
      setWorkerDialogProps({ open: true });
    }
  }, [mode, append]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          mode === FormMode.Edit && !readonly ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddWorker}>
              {t('component.worker.action.add_workers')}
            </Button>
          ) : undefined
        }
        value="component.worker.section_title.workers"
      />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <WorkerField control={control} errors={errors} index={index} mode={FormMode.Create} />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
            <SecondaryTable
              columns={[
                'component.worker.field.worker_first_name',
                'component.worker.field.worker_last_name',
                'component.worker.field.worker_since',
                'component.worker.field.worker_until',
                'component.worker.field.worker_craft',
                'component.worker.field.worker_level',
              ]}
              rows={fields.map((entry) => [
                entry.firstName,
                entry.lastName,
                entry.since,
                entry.until,
                entry.craft?.name,
                entry.qualificationLevel?.name,
              ])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditWorker}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit && readonly ? (
        <EmptyText value="component.worker.text.no_workers" />
      ) : (
        <></>
      )}
      {workerDialogProps.open && (
        <WorkerDialog input={workerDialogProps.input} onClose={handleCloseWorkerDialog} onSave={handleSaveWorker} />
      )}
      {mode === FormMode.Create && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddWorker}>
            {t('component.worker.action.add_workers')}
          </Button>
        </Grid2>
      )}
    </Grid2>
  );
};
