import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { getPermissionsTableRows } from '../../../../utils/components/permissionsTable/getPermissionsTableRows';
import { GroupRecapStepProps } from './Recap.types';

export const GroupRecapStep = ({ group, onBack, onEdit, onSave }: GroupRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(group);
  }, [group, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="group.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="group.section_title.general_data"
              items={[
                {
                  label: 'group.field.name',
                  value: group.name,
                },
                {
                  label: 'group.field.description',
                  value: group.description,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="group.section_title.permissions"
              items={[
                {
                  value:
                    group.permissions.length === 0
                      ? {
                          label: 'component.permissions_table.no_permissions',
                        }
                      : {
                          columns: [
                            'component.permissions_table.module',
                            'component.permissions_table.block',
                            'component.permissions_table.permissions',
                          ],
                          rows: getPermissionsTableRows(group.permissions, t),
                        },
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="group.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
