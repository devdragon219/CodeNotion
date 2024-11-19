import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import { getSubjectTaxIdOrVatNumber } from '../../../../utils/subject/subjectUtils';
import { ContractTakeoversDialogProps } from './Takeovers.types';

export const ContractTakeoversDialog = ({ takeovers, onClose }: ContractTakeoversDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="contract.dialog.takeovers" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'contract.field.takeover_new_subject_internal_code',
            'contract.field.takeover_new_subject_name',
            'contract.field.takeover_new_subject_tax_id_or_vat_number',
            'contract.field.takeover_date',
            'contract.field.takeover_effective_date',
            'contract.field.takeover_original_subject',
            'contract.field.takeover_type',
            'contract.field.takeover_legal_representative',
          ]}
          rows={takeovers.map((takeover) => [
            takeover.newSubject.internalCode,
            takeover.newSubject.name,
            getSubjectTaxIdOrVatNumber(takeover.newSubject),
            parseStringToLocalizedDate(takeover.takeoverDate, language),
            parseStringToLocalizedDate(takeover.effectiveDate, language),
            takeover.originalSubject.name,
            t(`common.enum.takeover_type.${takeover.type}`),
            takeover.legalRepresentativeSubject?.name,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
