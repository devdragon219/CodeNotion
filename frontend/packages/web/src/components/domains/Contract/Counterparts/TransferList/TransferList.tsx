import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { OperationResult, useClient } from 'urql';

import { GetAllSubjectsDocument, GetAllSubjectsQuery } from '../../../../../gql/RealGimm.Web.Subject.operation';
import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractCounterpartFormInput } from '../../../../../utils/contract/initialValues';
import { getSubjectTaxId, getSubjectVatNumber } from '../../../../../utils/subject/subjectUtils';
import { ContractCounterpartsTransferListProps } from './TransferList.types';

const ContractCounterpartsTransferList = forwardRef<HTMLDivElement, ContractCounterpartsTransferListProps>(
  (
    {
      counterparts,
      excludeSubjectIds,
      includeSubjectRelationId,
      isContractActive,
      since,
      titles,
      value,
      onAdd,
      onChange,
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<ContractCounterpartFormInput[]>([]);
    const client = useClient();

    const fetchSubjects = useCallback(async () => {
      setLoading(true);
      const result: OperationResult<GetAllSubjectsQuery> = await client.query(GetAllSubjectsDocument, {
        where: {
          categories: {
            some: {
              function: {
                eq: isContractActive
                  ? {
                      isTenant: true,
                    }
                  : {
                      isLandlord: true,
                    },
              },
            },
          },
          ...(excludeSubjectIds
            ? {
                id: {
                  nin: excludeSubjectIds,
                },
              }
            : {}),
          ...(includeSubjectRelationId
            ? {
                categories: {
                  some: {
                    function: {
                      eq: {
                        isHeir: true,
                      },
                    },
                  },
                },
                relationSubordinates: {
                  some: {
                    mainId: {
                      eq: includeSubjectRelationId,
                    },
                  },
                },
              }
            : {}),
        },
      });
      setLoading(false);
      setRows(result.data?.subject.listSubjectsFull.map(getEmptyContractCounterpartFormInput) ?? []);
    }, [excludeSubjectIds, includeSubjectRelationId, isContractActive, client]);

    useEffect(() => {
      if (counterparts) {
        setRows(counterparts);
      } else {
        void fetchSubjects();
      }
      // eslint-disable-next-line
    }, []);

    const handleAdd = useCallback(() => {
      onAdd?.onClick(fetchSubjects);
    }, [onAdd, fetchSubjects]);

    const handleChange = useCallback(
      (value: ContractCounterpartFormInput[]) => {
        if (since) {
          onChange(
            value.map((counterpart) => ({
              ...counterpart,
              since,
            })),
          );
        } else {
          onChange(value);
        }
      },
      [onChange, since],
    );

    return (
      <>
        {loading && <Loader />}
        <TransferList
          ref={ref}
          columns={[
            {
              id: 'internalCode',
              label: 'contract.field.subject_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: ({ subject }) => subject?.internalCode,
            },
            {
              id: 'name',
              label: 'contract.field.subject_name',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: ({ subject }) => subject?.name,
            },
            {
              id: 'taxIdCode',
              label: 'contract.field.subject_tax_id_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: ({ subject }) => getSubjectTaxId(subject),
            },
            {
              id: 'vatNumber',
              label: 'contract.field.subject_vat_number',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: ({ subject }) => getSubjectVatNumber(subject),
            },
          ]}
          empty="contract.text.no_subjects"
          rows={rows}
          titles={titles}
          value={value}
          getRowId={({ subject }) => String(subject?.id)}
          onAdd={
            onAdd
              ? {
                  ...onAdd,
                  onClick: handleAdd,
                }
              : undefined
          }
          onChange={handleChange}
        />
      </>
    );
  },
);
ContractCounterpartsTransferList.displayName = 'ContractCounterpartsTransferList';

export { ContractCounterpartsTransferList };
