import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { SubjectFragment } from '../../../../../gql/RealGimm.Web.Subject.fragment';
import { useGetAllSubjectsQuery } from '../../../../../gql/RealGimm.Web.Subject.operation';
import { ContractTransactorFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractTransactorFormInput } from '../../../../../utils/contract/initialValues';
import { getSubjectTaxId, getSubjectVatNumber } from '../../../../../utils/subject/subjectUtils';
import { ContractTransactorsTransferListProps } from './TransferList.types';

export const ContractTransactorsTransferList = ({
  control,
  excludeSubjectIds,
  isContractActive,
  setValue,
}: ContractTransactorsTransferListProps) => {
  const [queryState] = useGetAllSubjectsQuery({
    variables: {
      ...(excludeSubjectIds
        ? {
            where: {
              id: {
                nin: excludeSubjectIds,
              },
            },
          }
        : {}),
    },
  });
  const subjects = useMemo(() => queryState.data?.subject.listSubjectsFull ?? [], [queryState.data]);
  const since = useWatch({ control, name: 'effectStartDate' });
  const transactors = useWatch({ control, name: 'transactors' });
  const value = useMemo(() => transactors.map(({ subject }) => subject!), [transactors]);

  const handleChange = useCallback(
    (value: SubjectFragment[]) => {
      setValue(
        'transactors',
        value.map<ContractTransactorFormInput>((subject) => getEmptyContractTransactorFormInput(since, subject)),
      );
    },
    [setValue, since],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <TransferList
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
          left: `contract.section_title.transactors_${isContractActive ? 'notices' : 'warrants'}`,
          right: `contract.section_title.selected_transactors_${isContractActive ? 'notices' : 'warrants'}`,
        }}
        value={value}
        getRowId={({ id }) => String(id)}
        onChange={handleChange}
      />
    </>
  );
};
