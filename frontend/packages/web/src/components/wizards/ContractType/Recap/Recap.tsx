import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ContractTypeRecapStepProps } from './Recap.types';

export const ContractTypeRecapStep = ({ contractType, onBack, onEdit, onSave }: ContractTypeRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(contractType);
  }, [contractType, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="contract_type.tab.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="contract_type.section_title.general_data"
              items={[
                {
                  grid: 4,
                  label: 'contract_type.field.internal_code',
                  value: contractType.internalCode,
                },
                {
                  grid: 4,
                  label: 'contract_type.field.description',
                  value: contractType.description,
                },
                {
                  grid: 4,
                  label: 'contract_type.field.typology',
                  value: t(`contract_type.contract_typology.${contractType.isActive ? 'active' : 'passive'}`),
                },
                {
                  grid: 4,
                  label: 'contract_type.field.fee',
                  value: t(`common.text.${contractType.isRentChargeApplicable}`),
                },
                {
                  grid: 4,
                  label: 'contract_type.field.nature_type',
                  value: contractType.nature ? t(`common.enum.asset_nature.${contractType.nature}`) : null,
                },
                {
                  grid: 4,
                  label: 'contract_type.field.usage_type',
                  value: contractType.usageType?.name,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="contract_type.tab.parametric_data"
              items={[
                {
                  label: 'contract_type.section_title.registration_data',
                  value: [
                    {
                      grid: 4,
                      label: 'contract_type.field.subject_registration_tax',
                      value: t(`common.text.${contractType.isRegistrationTax}`),
                    },
                    {
                      grid: 4,
                      label: 'contract_type.field.stamp_tax',
                      value: t(`common.text.${contractType.isStampTax}`),
                    },
                    {
                      grid: 4,
                      label: 'contract_type.field.registration_tax_income_type',
                      value: contractType.registrationTaxIncomeType
                        ? t(`common.enum.registration_tax_income_type_rli.${contractType.registrationTaxIncomeType}`)
                        : null,
                    },
                    {
                      grid: 4,
                      label: 'contract_type.field.registration_tax_percent',
                      value: contractType.registrationTaxPercent,
                    },
                    {
                      grid: 8,
                      label: 'contract_type.field.registration_tax_tenant_percent',
                      value: contractType.registrationTaxTenantPercent,
                    },
                  ],
                },
                {
                  label: 'contract_type.section_title.revaluation_data',
                  value: [
                    {
                      grid: 4,
                      label: 'contract_type.field.revaluation',
                      value: t(`common.text.${contractType.isRevaluationApplicable}`),
                    },
                    {
                      grid: 4,
                      label: 'contract_type.field.is_absolute_revaluation',
                      value: t(`common.text.${contractType.isAbsoluteRevaluation}`),
                    },
                    {
                      grid: 4,
                      label: 'contract_type.field.revaluation_percent',
                      value: contractType.revaluationRatePercent,
                    },
                    {
                      grid: 4,
                      label: 'contract_type.field.revaluation_index_month',
                      value: contractType.revaluationIndexMonth
                        ? t(`common.enum.month.${contractType.revaluationIndexMonth}`)
                        : null,
                    },
                    {
                      grid: 8,
                      label: 'contract_type.field.revaluation_calculation_month',
                      value: contractType.revaluationCalculationMonth
                        ? t(`common.enum.month.${contractType.revaluationCalculationMonth}`)
                        : null,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="contract_type.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
