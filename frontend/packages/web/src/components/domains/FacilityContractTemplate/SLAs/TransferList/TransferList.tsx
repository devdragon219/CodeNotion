import { AddCircleOutline, EventTwoTone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, Loader, SectionTitle, TransferList } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetAllSlasQuery } from '../../../../../gql/RealGimm.Web.SLA.operation';
import { parseSlaToSlaFormInput } from '../../../../../utils/sla/parseSLAFragment';
import { FacilityContractTemplateSlasTransferListProps } from './TransferList.types';

export const FacilityContractTemplateSlasTransferList = ({
  control,
  errors,
  mode,
  where,
  onAddSlas,
  onOpenCalendar,
}: FacilityContractTemplateSlasTransferListProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetAllSlasQuery({
    variables: {
      where: {
        isAttachedToContract: {
          eq: false,
        },
        ...(where ?? {}),
      },
    },
  });
  const slas = useMemo(() => (queryState.data?.sla.listSLAsFull ?? []).map(parseSlaToSlaFormInput), [queryState.data]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      <SectionTitle
        actions={
          <>
            <Button color="secondary" variant="contained" startIcon={<EventTwoTone />} onClick={onOpenCalendar}>
              {t('facility_contract_template.action.calendar')}
            </Button>
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={onAddSlas}>
              {t('facility_contract_template.action.add_slas')}
            </Button>
          </>
        }
        value="facility_contract_template.section_title.slas"
      />
      {mode === FormMode.Edit && errors.slas?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.slas.message} />
        </Grid2>
      )}
      {queryState.fetching && <Loader />}
      <Grid2 size={12} sx={{ height: { xs: 'calc(100% - 64px)', sm: 'calc(100% - 72px)' } }}>
        <Controller
          name="slas"
          control={control}
          render={({ field }) => (
            <TransferList
              {...field}
              columns={[
                {
                  id: 'internalCode',
                  label: 'sla.field.internal_code',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
                {
                  id: 'description',
                  label: 'sla.field.description',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
              ]}
              empty="facility_contract_template.text.no_slas_selected"
              rows={slas}
              titles={{
                left: 'facility_contract_template.section_title.select_slas',
                right: 'facility_contract_template.section_title.selected_slas',
              }}
              getRowId={({ slaId }) => String(slaId)}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
