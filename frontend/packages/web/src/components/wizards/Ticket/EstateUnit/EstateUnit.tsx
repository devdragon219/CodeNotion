import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle, StepForm } from '@realgimm5/frontend-common/components';
import { useTable } from '@realgimm5/frontend-common/contexts';
import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import {
  GetEstateUnitsQueryVariables,
  useGetEstateUnitsQuery,
} from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { TicketFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getEstateUnitsColumns } from '../../../../utils/estateUnit/getEstateUnitsColumns';
import { getEstateUnitsFilterInput } from '../../../../utils/estateUnit/getEstateUnitsFilterInput';
import { getEstateUnitsSortInput } from '../../../../utils/estateUnit/getEstateUnitsSortInput';
import { getTicketEstateUnitSchema } from '../../../../utils/ticket/schemas/estateUnit';
import { TicketEstateUnitStepProps } from './EstateUnit.types';

export const TicketEstateUnitStep = ({ ticket, onBack, onChange, onError, onNext }: TicketEstateUnitStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketFormInput>({
    defaultValues: ticket,
    resolver: yupResolver(getTicketEstateUnitSchema(t)),
  });
  const { initialState, pause, variables, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetEstateUnitsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        status: {
          eq: EstateUnitStatus.Existing,
        },
        estate: {
          catalogueItems: {
            any: true,
          },
        },
        ...(ticket.facilityContract
          ? {
              id: {
                in: ticket.facilityContract.estateUnitIds,
              },
            }
          : {}),
      },
    }));
  const [queryState] = useGetEstateUnitsQuery({ pause, variables });
  const estateUnits = useMemo(() => queryState.data?.estateUnit.listEstateUnits, [queryState.data]);

  const handleRowSelected = useCallback(
    (row: EstateUnitFragment | null) => {
      setValue('locationEstateUnit', row);

      setValue('catalogueCategory', null);
      setValue('catalogueSubCategory', null);
      setValue('catalogueType', null);
      setValue('catalogueItems', []);
    },
    [setValue],
  );

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as TicketFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.locationEstateUnit) {
      onError(errors.locationEstateUnit.message);
    }
    // eslint-disable-next-line
  }, [errors.locationEstateUnit]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {queryState.fetching && <Loader />}
        <SectionTitle value="ticket.section_title.estate_unit" />
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={getEstateUnitsColumns(language, t).filter(({ id }) => id !== 'status')}
            empty="estate_unit.text.no_estate_units"
            initialState={initialState}
            rows={estateUnits?.nodes ?? []}
            totalCount={estateUnits?.totalCount ?? 0}
            useRowSelection={false}
            getRowId={({ id }) => String(id)}
            onFilter={handleFilter(getEstateUnitsFilterInput)}
            onPageChange={handlePageChange(estateUnits?.pageInfo)}
            onStateChange={setInitialState}
            onSort={handleSort(getEstateUnitsSortInput)}
            onRowSelected={handleRowSelected}
          />
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
