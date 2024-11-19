import { FileDownloadTwoTone } from '@mui/icons-material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { downloadFile } from '@realgimm5/frontend-common/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { RawFeature } from '../../../enums/RawFeature';
import { BillFragment } from '../../../gql/RealGimm.Web.Bill.fragment';
import {
  ExportActiveBillsDocument,
  ExportPassiveBillsDocument,
  GenerateBillPdfDocument,
  GenerateBillPdfQuery,
  GetBillsQueryVariables,
  useFinalizeBillsMutation,
  useGetBillsQuery,
} from '../../../gql/RealGimm.Web.Bill.operation';
import { useFeature } from '../../../hooks/useFeature';
import { getBillColumns } from '../../../utils/bill/getBillColumns';
import { BillsActions } from '../../domains/BillsActions/BillsActions';
import { BillsTableProps } from './Bills.types';
import { FinalizeBillsDialog } from './Dialog/Dialog';

export const BillsTable = ({ isActive, isTemporary }: BillsTableProps) => {
  const { canRead, canUpdate } = useFeature(RawFeature.PROP_BILL_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const client = useClient();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFinalizeBillsDialogOpen, setFinalizeBillsDialogOpen] = useState(false);
  const [, finalizeBillsMutation] = useFinalizeBillsMutation();
  const {
    initialState,
    pause,
    variables,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setDefaultVariables,
    setInitialState,
  } = useTable<GetBillsQueryVariables>((variables) => ({
    ...variables,
    where: {
      ...(variables.where ?? {}),
      ...(isTemporary !== undefined
        ? {
            isTemporary: {
              eq: isTemporary,
            },
          }
        : {}),
      contract: {
        ...(variables.where?.contract ?? {}),
        type: {
          ...(variables.where?.contract?.type ?? {}),
          isActive: {
            eq: isActive,
          },
        },
      },
    },
  }));
  const [queryState, reexecuteQuery] = useGetBillsQuery({ pause, variables });
  const bills = useMemo(() => queryState.data?.bill.listBills, [queryState.data]);

  useEffect(() => {
    setDefaultVariables(() => (variables: GetBillsQueryVariables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        contract: {
          ...(variables.where?.contract ?? {}),
          type: {
            ...(variables.where?.contract?.type ?? {}),
            isActive: {
              eq: isActive,
            },
          },
        },
      },
    }));
    // eslint-disable-next-line
  }, [isActive]);

  const handleOpenFinalizeBillsDialog = useCallback(() => {
    setFinalizeBillsDialogOpen(true);
  }, []);
  const handleCloseFinalizeBillsDialog = useCallback(() => {
    setFinalizeBillsDialogOpen(false);
  }, []);
  const handleFinalizeBills = useCallback(
    async (billIds: number[]) => {
      setLoading(true);
      const result = await finalizeBillsMutation({ billIds });
      setLoading(false);
      if (result.data?.bill.finalize.isSuccess) {
        showSnackbar(t(`bill.feedback.finalize.${billIds.length === 1 ? 'single' : 'multiple'}`), 'success');
        handleCloseFinalizeBillsDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.bill.finalize.validationErrors);
      }
    },
    [finalizeBillsMutation, handleCloseFinalizeBillsDialog, reexecuteQuery, showError, showSnackbar, t],
  );

  const handleGeneratePdf = useCallback(
    async (row: BillFragment) => {
      setLoading(true);
      const result: OperationResult<GenerateBillPdfQuery> = await client.query(GenerateBillPdfDocument, {
        billId: row.id,
      });
      setLoading(false);
      if (result.data?.bill.generatePdf.value?.resourceUrl) {
        downloadFile(result.data.bill.generatePdf.value.resourceUrl);
      } else {
        showError(result.data?.bill.generatePdf.validationErrors);
      }
    },
    [client, showError],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {isFinalizeBillsDialogOpen && (
        <FinalizeBillsDialog
          isActive={isActive}
          onClose={handleCloseFinalizeBillsDialog}
          onSave={handleFinalizeBills}
        />
      )}
      <PrimaryTable
        columns={getBillColumns(isActive, language, t, isTemporary === undefined)}
        customRowActions={[
          {
            context: 'row',
            icon: FileDownloadTwoTone,
            id: 'download',
            label: 'bill.action.generate_pdf',
            onClick: handleGeneratePdf,
          },
        ]}
        customTableActions={
          isTemporary !== false ? <BillsActions onFinalize={handleOpenFinalizeBillsDialog} /> : undefined
        }
        empty={`bill.text.no_${isActive ? 'active' : 'passive'}_bills`}
        initialState={initialState}
        rows={bills?.nodes ?? []}
        totalCount={bills?.totalCount ?? 0}
        getRowId={({ id }) => String(id)}
        onEdit={
          canUpdate
            ? (row) => {
                navigate(`/app/asset-management/bills/${isActive ? 'active' : 'passive'}/${row.id}`, {
                  state: { readonly: false },
                });
              }
            : undefined
        }
        onExport={
          canRead ? handleExport('id', isActive ? ExportActiveBillsDocument : ExportPassiveBillsDocument) : undefined
        }
        onFilter={handleFilter()}
        onPageChange={handlePageChange(bills?.pageInfo)}
        onStateChange={setInitialState}
        onSort={handleSort()}
        onView={
          canRead
            ? (row) => {
                navigate(`/app/asset-management/bills/${isActive ? 'active' : 'passive'}/${row.id}`);
              }
            : undefined
        }
      />
    </>
  );
};
