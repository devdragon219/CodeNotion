import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { AddressType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { AdministrationRecapStepProps } from './Recap.types';

export const AdministrationRecapStep = ({ administration, onBack, onEdit, onSave }: AdministrationRecapStepProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(administration);
  }, [administration, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="administration.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="administration.tab.estate"
              items={[
                {
                  label: 'estate.field.estate_code',
                  value: administration.estate?.internalCode,
                  grid: 4,
                },
                {
                  label: 'estate.field.estate_name',
                  value: administration.estate?.name,
                  grid: 4,
                },
                {
                  label: 'estate_unit.field.estate_usage_type',
                  value: administration.estate?.mainUsageTypeName,
                  grid: 4,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="administration.tab.administration"
              items={[
                {
                  value: {
                    columns: [
                      'administration.field.administration_type',
                      'administration.field.administrator',
                      'administration.field.start_date',
                      'administration.field.end_date',
                      'administration.field.payment_type',
                      'administration.field.is_payment_data_included',
                      'subject.field.bank_account_number',
                      'subject.field.bank_account_holder',
                      'subject.field.address_toponymy',
                    ],
                    rows: administration.administrations.map((administration) => [
                      administration.administrationType
                        ? t(`common.enum.administration_type.${administration.administrationType}`)
                        : null,
                      administration.administratorSubject?.name,
                      administration.since,
                      administration.until,
                      administration.paymentType ? t(`common.enum.payment_type.${administration.paymentType}`) : null,
                      administration.isPaymentDataIncluded,
                      administration.bankAccount?.referenceCode,
                      administration.bankAccount?.accountHolder,
                      parseAddressToString(
                        administration.administratorSubject?.addresses?.find(
                          (it) => it.addressType === AddressType.LegalResidential,
                        ),
                        language,
                      ),
                    ]),
                  },
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="administration.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
