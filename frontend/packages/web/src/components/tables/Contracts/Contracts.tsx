import { AddCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import {
  DeleteContractsDocument,
  ExportContractsDocument,
  GetContractsQueryVariables,
  useCreateContractMutation,
  useGetContractsQuery,
} from '../../../gql/RealGimm.Web.Contract.operation';
import { ContractFragment } from '../../../gql/RealGimm.Web.ContractListOutput.fragment';
import { useContract } from '../../../hooks/useContract';
import { useFeature } from '../../../hooks/useFeature';
import { ContractFormInput } from '../../../interfaces/FormInputs/Contract';
import { getContractsColumns } from '../../../utils/contract/getContractsColumns';
import { getContractsFilterInput } from '../../../utils/contract/getContractsFilterInput';
import { getContractsSortInput } from '../../../utils/contract/getContractsSortInput';
import {
  parseContractFormInputToContractInput,
  parseContractFormInputToContractSublocatedFormInput,
} from '../../../utils/contract/parseContractFormInput';
import { ContractLocatedUnitsDialog } from '../../dialogs/Contract/LocatedUnits/LocatedUnits';
import { ContractCreateDialog } from '../../wizards/Contract/Contract';
import { ContractsTableProps } from './Contracts.types';

export const ContractsTable = ({ contract, isActive, readonly, status }: ContractsTableProps) => {
  const { canCreate, canDelete, canRead, canUpdate } = useFeature(RawFeature.PROP_CONTRACT_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setDefaultVariables,
    setInitialState,
  } = useTable<GetContractsQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      ...(contract
        ? {
            sublocatedContract: {
              id: {
                eq: contract.contractId,
              },
            },
          }
        : {}),
      ...(status
        ? {
            status: {
              eq: status,
            },
          }
        : {}),
      type: {
        ...(variables.where?.type ?? {}),
        isActive: {
          eq: isActive,
        },
      },
    },
  }));
  const [queryState, reexecuteQuery] = useGetContractsQuery({ pause, variables });
  const [, createContractMutation] = useCreateContractMutation();
  const { addDocumentsAsync } = useContract();
  const [loading, setLoading] = useState(false);
  const [contractLocatedUnitsDialogProps, setContractLocatedUnitsDialogProps] = useState<ContractFragment | null>(null);
  const [createContractDialogProps, setCreateContractDialogProps] = useState<{
    isActive: boolean;
    isSublocated: boolean;
  } | null>(null);
  const contracts = useMemo(() => queryState.data?.contract.listContracts, [queryState.data]);
  const hasNoContracts = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (contracts?.totalCount ?? 0) === 0,
    [contracts, variables],
  );

  useEffect(() => {
    setDefaultVariables(() => (variables: GetContractsQueryVariables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        type: {
          ...(variables.where?.type ?? {}),
          isActive: {
            eq: isActive,
          },
        },
      },
    }));
    // eslint-disable-next-line
  }, [isActive]);

  const handleOpenCreateActiveContractDialog = useCallback(() => {
    setCreateContractDialogProps({
      isActive: true,
      isSublocated: false,
    });
  }, []);
  const handleOpenCreateSublocatedContractDialog = useCallback(() => {
    setCreateContractDialogProps({
      isActive: true,
      isSublocated: true,
    });
  }, []);
  const handleOpenCreatePassiveContractDialog = useCallback(() => {
    setCreateContractDialogProps({
      isActive: false,
      isSublocated: false,
    });
  }, []);
  const handleCloseCreateContractDialog = useCallback(() => {
    setCreateContractDialogProps(null);
  }, []);
  const handleSaveCreateContract = useCallback(
    async (contract: ContractFormInput) => {
      setLoading(true);
      const result = await createContractMutation({ contractInput: parseContractFormInputToContractInput(contract) });
      setLoading(false);
      if (result.data?.contract.add.isSuccess) {
        showSnackbar(t('contract.feedback.create'), 'success');
        addDocumentsAsync(result.data.contract.add.value!.id, contract.documents);
        handleCloseCreateContractDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.contract.add.validationErrors);
      }
    },
    [
      createContractMutation,
      showSnackbar,
      t,
      addDocumentsAsync,
      handleCloseCreateContractDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const showAllButton = useCallback(
    (row: ContractFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setContractLocatedUnitsDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseContractLocatedUnitsDialog = useCallback(() => {
    setContractLocatedUnitsDialogProps(null);
  }, []);

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoContracts ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="contract.text.no_sub_locations" />
      ) : (
        <PrimaryTable
          color={contract ? 'secondary' : 'primary'}
          columns={getContractsColumns(isActive, t, showAllButton, { useStatus: !status })}
          empty={`contract.text.no_${isActive ? 'active' : 'passive'}_contracts`}
          initialState={initialState}
          rows={contracts?.nodes ?? []}
          totalCount={contracts?.totalCount ?? 0}
          useRowSelection={!readonly}
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly || !canCreate
              ? undefined
              : isActive
                ? contract
                  ? {
                      color: 'secondary',
                      icon: <AddCircleOutline />,
                      label: 'contract.action.add_sub_location',
                      onClick: handleOpenCreateSublocatedContractDialog,
                    }
                  : [
                      {
                        label: 'contract.action.add_active_contract',
                        onClick: handleOpenCreateActiveContractDialog,
                      },
                      {
                        label: 'contract.action.add_sublocated_contract',
                        onClick: handleOpenCreateSublocatedContractDialog,
                      },
                    ]
                : handleOpenCreatePassiveContractDialog
          }
          onDelete={
            readonly || !canDelete ? undefined : handleDelete('contract', DeleteContractsDocument, reexecuteQuery)
          }
          onEdit={
            readonly || !canUpdate
              ? undefined
              : (row) => {
                  navigate(`/app/asset-management/contracts/${isActive ? 'active' : 'passive'}/${row.id}`, {
                    state: { readonly: false },
                  });
                }
          }
          onExport={readonly || !canRead ? undefined : handleExport('id', ExportContractsDocument)}
          onFilter={handleFilter(getContractsFilterInput)}
          onPageChange={handlePageChange(contracts?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort(getContractsSortInput)}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/asset-management/contracts/${isActive ? 'active' : 'passive'}/${row.id}`);
                }
              : undefined
          }
        />
      )}
      {contractLocatedUnitsDialogProps && (
        <ContractLocatedUnitsDialog
          contract={contractLocatedUnitsDialogProps}
          onClose={handleCloseContractLocatedUnitsDialog}
        />
      )}
      {createContractDialogProps && (
        <ContractCreateDialog
          isActive={createContractDialogProps.isActive}
          isSublocated={createContractDialogProps.isSublocated}
          sublocatedContract={contract ? parseContractFormInputToContractSublocatedFormInput(contract) : undefined}
          onClose={handleCloseCreateContractDialog}
          onSave={handleSaveCreateContract}
        />
      )}
    </>
  );
};
