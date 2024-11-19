import { CheckCircleOutline, Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ConfirmationDialog, Dialog, DialogContent, Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetAllBillsQuery } from '../../../../gql/RealGimm.Web.Bill.operation';
import { BillFullListOutputFragment } from '../../../../gql/RealGimm.Web.BillFullListOutput.fragment';
import { FinalizeBillsDialogProps } from './Dialog.types';

export const FinalizeBillsDialog = ({ isActive, onClose, onSave }: FinalizeBillsDialogProps) => {
  const { t } = useTranslation();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [value, setValue] = useState<BillFullListOutputFragment[]>([]);
  const [queryState] = useGetAllBillsQuery({
    variables: {
      where: {
        contract: {
          type: {
            isActive: {
              eq: isActive,
            },
          },
        },
        isTemporary: {
          eq: true,
        },
      },
    },
  });
  const bills = useMemo(() => queryState.data?.bill.listBillsFull ?? [], [queryState.data]);

  const showConfirmationDialog = useCallback(() => {
    setConfirmationVisible(true);
  }, []);
  const hideConfirmationDialog = useCallback(() => {
    setConfirmationVisible(false);
  }, []);

  const handleSave = useCallback(() => {
    onSave(value.map(({ id }) => id));
  }, [value, onSave]);

  return isConfirmationVisible ? (
    <ConfirmationDialog
      open
      onClose={hideConfirmationDialog}
      type="alert"
      icon={Warning}
      title={`bill.dialog.finalize_bills.confirmation.${isActive ? 'active' : 'passive'}`}
      actions={
        <>
          <Button color="secondary" onClick={hideConfirmationDialog}>
            {t('common.button.cancel')}
          </Button>
          <Button color="primary" variant="contained" onClick={handleSave}>
            {t('bill.dialog.finalize_bills.action')}
          </Button>
        </>
      }
    />
  ) : (
    <Dialog fullScreen open title="bill.dialog.finalize_bills.title" onClose={onClose}>
      {queryState.fetching && <Loader />}
      <DialogContent
        fixedHeight
        action={
          <Button
            color="primary"
            variant="contained"
            startIcon={<CheckCircleOutline />}
            disabled={value.length === 0}
            onClick={showConfirmationDialog}
          >
            {t('bill.dialog.finalize_bills.action')}
          </Button>
        }
      >
        <TransferList
          columns={[
            {
              id: 'contractInternalCode',
              label: 'bill.field.contract_code',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) => row.contractInternalCode,
            },
            {
              id: 'contractManagementSubject.name',
              label: 'bill.field.management_subject',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) => row.contractManagementSubject.name,
            },
            {
              id: 'mainCounterpartSubject.name',
              label: 'bill.field.counterpart',
              enableColumnFilter: true,
              enableGlobalFilter: true,
              enableSorting: true,
              getRowValue: (row) => row.mainCounterpartSubject.name,
            },
            {
              id: 'since',
              type: 'date',
              label: 'bill.field.since',
              enableColumnFilter: true,
              enableSorting: true,
            },
          ]}
          empty={`bill.text.no_${isActive ? 'active' : 'passive'}_bills`}
          rows={bills}
          titles={{
            left: `bill.section_title.select_${isActive ? 'active' : 'passive'}_bills`,
            right: `bill.section_title.selected_${isActive ? 'active' : 'passive'}_bills`,
          }}
          value={value}
          getRowId={({ id }) => String(id)}
          onChange={setValue}
        />
      </DialogContent>
    </Dialog>
  );
};
