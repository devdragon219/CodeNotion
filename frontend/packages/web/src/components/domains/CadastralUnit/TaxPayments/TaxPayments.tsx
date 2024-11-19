import { Grid2, Typography } from '@mui/material';
import { PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { MouseEvent, useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitTaxPaymentFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCadastralUnitTaxPaymentsColumns } from '../../../../utils/cadastralUnit/getCadastralUnitTaxPaymentsColumns';
import { CadastralUnitTaxDownPaymentsDialog } from './Dialog/Dialog';
import { CadastralUnitTaxPaymentsProps } from './TaxPayments.types';

export const CadastralUnitTaxPayments = ({ control }: CadastralUnitTaxPaymentsProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [downPaymentsDialogProps, setDownPaymentsDialogProps] = useState<CadastralUnitTaxPaymentFormInput | null>(null);

  const taxPayments = useWatch({ control, name: 'taxPayments' });

  const showAllButton = useCallback(
    (row: CadastralUnitTaxPaymentFormInput) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setDownPaymentsDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseDownPaymentsDialog = useCallback(() => {
    setDownPaymentsDialogProps(null);
  }, []);

  return (
    <>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <SectionTitle value="cadastral_unit.section_title.tax_payments" />
        <Grid2 size={12}>
          <PrimaryTable
            color="secondary"
            columns={getCadastralUnitTaxPaymentsColumns(showAllButton, language)}
            rows={taxPayments}
            getRowId={({ id }) => String(id)}
            useRowSelection={false}
            useColumnVisibility={false}
          />
        </Grid2>
      </Grid2>
      {downPaymentsDialogProps && (
        <CadastralUnitTaxDownPaymentsDialog
          taxPayment={downPaymentsDialogProps}
          onClose={handleCloseDownPaymentsDialog}
        />
      )}
    </>
  );
};
