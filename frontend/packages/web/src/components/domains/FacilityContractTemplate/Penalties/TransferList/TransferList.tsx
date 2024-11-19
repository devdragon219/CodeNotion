import { AddCircleOutline, EventTwoTone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, Loader, SectionTitle, TransferList } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllPenaltiesQuery } from '../../../../../gql/RealGimm.Web.Penalty.operation';
import { parsePenaltyToPenaltyFormInput } from '../../../../../utils/penalty/parsePenaltyFragment';
import { FacilityContractTemplatePenaltiesTransferListProps } from './TransferList.types';

export const FacilityContractTemplatePenaltiesTransferList = ({
  control,
  errors,
  mode,
  where,
  onAddPenalties,
  onOpenCalendar,
}: FacilityContractTemplatePenaltiesTransferListProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetAllPenaltiesQuery({
    variables: {
      where: {
        isAttachedToContract: {
          eq: false,
        },
        ...(where ?? {}),
      },
    },
  });
  const penalties = useMemo(
    () => (queryState.data?.penalty.listPenaltiesFull ?? []).map(parsePenaltyToPenaltyFormInput),
    [queryState.data],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      {queryState.fetching && <Loader />}
      <SectionTitle
        actions={
          <>
            <Button color="secondary" variant="contained" startIcon={<EventTwoTone />} onClick={onOpenCalendar}>
              {t('facility_contract_template.action.calendar')}
            </Button>
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={onAddPenalties}>
              {t('facility_contract_template.action.add_penalties')}
            </Button>
          </>
        }
        value="facility_contract_template.section_title.penalties"
      />
      {mode === FormMode.Edit && errors.penalties?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.penalties.message} />
        </Grid2>
      )}
      <Grid2 size={12} sx={{ height: { xs: 'calc(100% - 64px)', sm: 'calc(100% - 72px)' } }}>
        <Controller
          name="penalties"
          control={control}
          render={({ field }) => (
            <TransferList
              {...field}
              columns={[
                {
                  id: 'internalCode',
                  label: 'penalty.field.internal_code',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
                {
                  id: 'description',
                  label: 'penalty.field.description',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
              ]}
              empty="facility_contract_template.text.no_penalties_selected"
              rows={penalties}
              titles={{
                left: 'facility_contract_template.section_title.select_penalties',
                right: 'facility_contract_template.section_title.selected_penalties',
              }}
              getRowId={({ penaltyId }) => String(penaltyId)}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
