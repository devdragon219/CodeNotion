import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { getDifferenceInDays, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AdministrationTermInstallmentsTable } from '../../../domains/AdministrationTerm/InstallmentsTable/InstallmentsTable';
import { AdministrationTermRecapStepProps } from './Recap.types';

export const AdministrationTermRecapStep = ({
  administrationTerm,
  onBack,
  onEdit,
  onSave,
}: AdministrationTermRecapStepProps) => {
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
    onSave(administrationTerm);
  }, [administrationTerm, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="administration_term.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="administration_term.tab.general_data"
              items={[
                {
                  label: 'administration_term.field.term_type',
                  value: administrationTerm.termType ? t(`common.enum.term_type.${administrationTerm.termType}`) : '',
                  grid: 4,
                },
                {
                  label: 'administration_term.field.name',
                  value: administrationTerm.name,
                  grid: 4,
                },
                {
                  label: 'administration_term.field.expected_amount',
                  value: parseNumberToCurrency(administrationTerm.expectedAmount, language),
                  grid: 4,
                },
                {
                  label: 'administration_term.field.since',
                  value: administrationTerm.since,
                  grid: 4,
                },
                {
                  label: 'administration_term.field.until',
                  value: administrationTerm.until,
                  grid: 4,
                },
                {
                  label: 'administration_term.field.days',
                  value: getDifferenceInDays(administrationTerm.since, administrationTerm.until) ?? '-',
                  grid: 4,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="administration_term.tab.installments"
              items={<AdministrationTermInstallmentsTable installments={administrationTerm.installments} />}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="administration_term.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
