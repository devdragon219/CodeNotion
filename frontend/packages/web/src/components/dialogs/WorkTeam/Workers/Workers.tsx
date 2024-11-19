import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { WorkTeamWorkersDialogProps } from './Workers.types';

export const WorkTeamWorkersDialog = ({ workers, onClose }: WorkTeamWorkersDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open onClose={onClose} title="work_team.dialog.view_workers">
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('common.button.save')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'component.worker.field.worker_first_name',
            'component.worker.field.worker_last_name',
            'component.worker.field.worker_since',
            'component.worker.field.worker_until',
            'component.worker.field.worker_craft',
            'component.worker.field.worker_level',
          ]}
          rows={workers.map((entry) => [
            entry.firstName,
            entry.lastName,
            entry.since,
            entry.until,
            entry.craft.name,
            entry.qualificationLevel.name,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
