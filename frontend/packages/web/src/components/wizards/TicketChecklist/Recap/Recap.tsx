import { Grid2 } from '@mui/material';
import { PrimaryTable, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { GroupedTicketChecklistRow } from '../../../../interfaces/FormInputs/TicketChecklist';
import { getTicketChecklistsColumns } from '../../../../utils/ticketChecklist/getTicketChecklistsColumns';
import { TicketChecklistsRecapStepProps } from './Recap.types';

export const TicketChecklistsRecapStep = ({ ticketChecklists, onBack, onSave }: TicketChecklistsRecapStepProps) => {
  const { t } = useTranslation();

  const rows = useMemo(
    () =>
      ticketChecklists.estateUnits.map((estateUnit) => ({
        estateUnit,
        ticketChecklists: ticketChecklists.ticketChecklistTemplates.filter((template) =>
          ticketChecklists.catalogueTypes[template.catalogueType.id]?.includes(estateUnit.estate.id),
        ),
      })),
    [ticketChecklists.catalogueTypes, ticketChecklists.estateUnits, ticketChecklists.ticketChecklistTemplates],
  );

  const handleComplete = useCallback(() => {
    onSave(ticketChecklists);
  }, [ticketChecklists, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="ticket_checklist.section_title.recap" />
          <Grid2 size={12}>
            <PrimaryTable
              color="secondary"
              columns={getTicketChecklistsColumns<GroupedTicketChecklistRow>(t, { useGroupByEstateUnit: true })}
              empty="ticket_checklist.text.no_ticket_checklists"
              rows={rows}
              totalCount={rows.length}
              useRowExpandCollapse
              useRowSelection={false}
              useSelectedRows={false}
              getRowId={(row) => String(row.estateUnit?.id ?? row.id)}
              getSubRows={(row) => row.ticketChecklists}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="ticket_checklist.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
