import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { useGetAllSubjectsQuery } from '../../../../../../gql/RealGimm.Web.Subject.operation';
import { getSubjectTaxId, getSubjectVatNumber } from '../../../../../../utils/subject/subjectUtils';
import { TakeoverSubjectsFieldProps } from './TakeoverSubjectsField.types';

export const TakeoverSubjectsField = ({ control }: TakeoverSubjectsFieldProps) => {
  const [queryState] = useGetAllSubjectsQuery();
  const subjects = useMemo(() => queryState.data?.subject.listSubjectsFull ?? [], [queryState.data]);

  return (
    <>
      {queryState.fetching && <Loader />}
      <Controller
        name="registrationTax.takeoverSubjects"
        control={control}
        render={({ field }) => (
          <TransferList
            {...field}
            columns={[
              {
                id: 'internalCode',
                label: 'contract.field.subject_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
              },
              {
                id: 'name',
                label: 'contract.field.subject_name',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => row.name,
              },
              {
                id: 'taxIdCode',
                label: 'contract.field.subject_tax_id_code',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => getSubjectTaxId(row),
              },
              {
                id: 'vatNumber',
                label: 'contract.field.subject_vat_number',
                enableColumnFilter: true,
                enableGlobalFilter: true,
                enableSorting: true,
                getRowValue: (row) => getSubjectVatNumber(row),
              },
            ]}
            empty="contract.text.no_subjects"
            rows={subjects}
            titles={{
              left: 'contract.section_title.registration_tax_takeover_subjects',
              right: 'contract.section_title.selected_registration_tax_takeover_subjects',
            }}
            getRowId={({ id }) => String(id)}
          />
        )}
      />
    </>
  );
};
