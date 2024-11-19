import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentRecapStepProps } from './Recap.types';

export const RegistrationPaymentRecapStep = ({
  registrationPayment,
  onBack,
  onEdit,
  onSave,
}: RegistrationPaymentRecapStepProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(registrationPayment);
  }, [registrationPayment, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="registration_payment.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="registration_payment.tab.contract"
              items={[
                {
                  label: 'registration_payment.field.contract_code',
                  value: registrationPayment.contract?.internalCode,
                },
                {
                  label: 'registration_payment.field.management_subject',
                  value: registrationPayment.contract?.managementSubjectName,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="registration_payment.tab.general_data"
              items={[
                {
                  label: 'registration_payment.field.payment_code',
                  value: registrationPayment.paymentCode,
                },
                {
                  label: 'registration_payment.field.payment_date',
                  value: registrationPayment.valueDate,
                },
                {
                  label: 'registration_payment.field.payment_year',
                  value: registrationPayment.paymentYear,
                },
                {
                  label: 'registration_payment.field.tax_amount',
                  value: parseNumberToCurrency(registrationPayment.taxAmount, language),
                },
                {
                  label: 'registration_payment.field.sanction_amount',
                  value: parseNumberToCurrency(registrationPayment.sanctionAmount, language),
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="registration_payment.tab.rows"
              items={[
                {
                  value: {
                    columns: [
                      'registration_payment.field.row_entity',
                      'registration_payment.field.row_code',
                      'registration_payment.field.row_description',
                      'registration_payment.field.row_period',
                      'registration_payment.field.row_year',
                      'registration_payment.field.row_amount_due',
                      'registration_payment.field.row_amount_cleared',
                    ],
                    rows: registrationPayment.rows.map((entry) => [
                      entry.paymentRowReceivingEntity,
                      entry.paymentRowCode,
                      entry.paymentRowSection,
                      entry.referencePeriod,
                      entry.referenceYear,
                      parseNumberToCurrency(entry.amountDue, language),
                      parseNumberToCurrency(entry.amountCleared, language),
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions
        completeLabel="registration_payment.dialog.create.save"
        onBack={onBack}
        onComplete={handleComplete}
      />
    </>
  );
};
