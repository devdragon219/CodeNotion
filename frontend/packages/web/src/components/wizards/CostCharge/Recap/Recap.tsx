import { Grid2 } from '@mui/material';
import {
  RecapSection,
  RecapSectionItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { parseDateToLocalizedString, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { SubjectFragment } from '../../../../gql/RealGimm.Web.Subject.fragment';
import { getSubjectVatNumber } from '../../../../utils/subject/subjectUtils';
import { CostChargeRecapStepProps } from './Recap.types';

export const CostChargeRecapStep = ({ costCharge, onBack, onEdit, onSave }: CostChargeRecapStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(costCharge);
  }, [costCharge, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="cost_charge.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="cost_charge.tab.utility_service"
              items={[
                {
                  grid: 4,
                  label: 'cost_charge.field.reference_subject',
                  value: costCharge.utilityService?.referenceSubject.name,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.org_unit',
                  value: costCharge.utilityService?.orgUnit.name,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_type',
                  value: `${costCharge.utilityService?.utilityType.internalCode} - ${costCharge.utilityService?.utilityType.description}`,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.provider_subject',
                  value: costCharge.utilityService?.providerSubject.name,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.provider_subject_internal_code',
                  value: costCharge.utilityService?.providerSubject.internalCode,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.provider_subject_vat_number',
                  value: getSubjectVatNumber(costCharge.utilityService?.providerSubject as SubjectFragment),
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.accounting_item',
                  value: costCharge.utilityService?.accountingItem.description,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_description',
                  value: costCharge.utilityService?.description,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_contract_code',
                  value: costCharge.utilityService?.utilityContractCode,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_user_code',
                  value: costCharge.utilityService?.utilityUserCode,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_type_metering_type',
                  value: costCharge.utilityService?.utilityType.meteringType
                    ? t(`common.enum.metering_type.${costCharge.utilityService.utilityType.meteringType}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.free_market',
                  value: costCharge.utilityService?.isFreeMarket,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.deposit',
                  value: parseNumberToCurrency(costCharge.utilityService?.deposit, language),
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.status',
                  value: costCharge.utilityService?.status
                    ? t(`common.enum.entry_status.${costCharge.utilityService.status}`)
                    : null,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.activation_date',
                  value: costCharge.utilityService?.activationDate,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_meter_serial',
                  value: costCharge.utilityService?.utilityMeterSerial,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.utility_delivery_point_code',
                  value: costCharge.utilityService?.utilityDeliveryPointCode,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.contract_power_nominal',
                  value: costCharge.utilityService?.contractPowerNominal,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.contract_power_maximum',
                  value: costCharge.utilityService?.contractPowerMaximum,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.contract_nominal_tension',
                  value: costCharge.utilityService?.contractNominalTension,
                },
                {
                  grid: 4,
                  label: 'cost_charge.field.notes',
                  value: costCharge.utilityService?.notes,
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="cost_charge.tab.general_data"
              items={[
                {
                  label: 'cost_charge.field.total_amount',
                  value: parseNumberToCurrency(costCharge.totalAmount, language),
                  grid: 4,
                },
                {
                  label: 'cost_charge.field.period_start',
                  value: costCharge.periodStart,
                  grid: 4,
                },
                {
                  label: 'cost_charge.field.period_end',
                  value: costCharge.periodEnd,
                  grid: 4,
                },
                {
                  label: 'cost_charge.field.reference_date',
                  value: costCharge.referenceDate,
                  grid: 4,
                },
                {
                  label: 'cost_charge.field.due_date',
                  value: costCharge.dueDate,
                  grid: 4,
                },
                {
                  label: 'cost_charge.field.invoice_number',
                  value: costCharge.invoiceNumber,
                  grid: 4,
                },
                {
                  label: 'cost_charge.field.vat_amount',
                  value: parseNumberToCurrency(costCharge.totalVatAmount, language),
                  grid: 4,
                },
                {
                  label: 'cost_charge.section_title.invoiced_consumption',
                  value: [
                    {
                      label: 'cost_charge.field.invoiced_consumption',
                      value: `${costCharge.invoicedConsumptionAmount} ${costCharge.utilityService?.utilityType.measurementUnit}`,
                    },
                  ],
                },
                {
                  label: 'cost_charge.section_title.actual_consumption',
                  value: costCharge.consumptions.actual!.since
                    ? {
                        columns: [
                          'cost_charge.field.period',
                          ...costCharge.consumptions.actual!.values.map(
                            (_, index) =>
                              t('cost_charge.field.reading_value', { index: index + 1 }) as unknown as ParseKeys,
                          ),
                        ],
                        rows: [
                          [
                            `${parseDateToLocalizedString(costCharge.consumptions.actual!.since, language)} - ${parseDateToLocalizedString(costCharge.consumptions.actual!.until, language)}`,
                            ...costCharge.consumptions.actual!.values.map(({ value }) =>
                              [value, costCharge.utilityService?.utilityType.measurementUnit].join(' '),
                            ),
                          ],
                        ],
                      }
                    : {
                        label: 'cost_charge.text.no_actual_consumption',
                      },
                },
                {
                  label: 'cost_charge.section_title.expected_consumption',
                  value: costCharge.consumptions.expected!.since
                    ? {
                        columns: [
                          'cost_charge.field.period',
                          ...costCharge.consumptions.expected!.values.map(
                            (_, index) =>
                              t('cost_charge.field.reading_value', { index: index + 1 }) as unknown as ParseKeys,
                          ),
                        ],
                        rows: [
                          [
                            `${parseDateToLocalizedString(costCharge.consumptions.expected!.since, language)} - ${parseDateToLocalizedString(costCharge.consumptions.expected!.until, language)}`,
                            ...costCharge.consumptions.expected!.values.map(({ value }) =>
                              [value, costCharge.utilityService?.utilityType.measurementUnit].join(' '),
                            ),
                          ],
                        ],
                      }
                    : {
                        label: 'cost_charge.text.no_expected_consumption',
                      },
                },
                ...((costCharge.fields.length === 0
                  ? []
                  : [
                      {
                        label: 'cost_charge.section_title.other_data',
                        value: costCharge.fields
                          .flatMap((fields) => fields)
                          .map((field) => ({
                            label: field.name,
                            value: field.value,
                            grid: 4,
                          })),
                      },
                    ]) as RecapSectionItem[]),
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="cost_charge.dialog.create.single.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
