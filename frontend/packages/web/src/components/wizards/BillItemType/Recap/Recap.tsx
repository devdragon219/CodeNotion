import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { BillItemTypeRecapStepProps } from './Recap.types';

export const BillItemTypeRecapStep = ({ billItemType, onBack, onEdit, onSave }: BillItemTypeRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(billItemType);
  }, [billItemType, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="bill_item_type.tab.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="bill_item_type.tab.general_data"
              items={[
                {
                  label: 'bill_item_type.section_title.general_data',
                  value: [
                    {
                      grid: 4,
                      label: 'bill_item_type.field.internal_code',
                      value: billItemType.internalCode,
                    },
                    {
                      grid: 4,
                      label: 'bill_item_type.field.description',
                      value: billItemType.description,
                    },
                    {
                      grid: 4,
                      label: 'bill_item_type.field.sign',
                      value: billItemType.isPositive ? '+' : '-',
                    },
                    {
                      grid: 4,
                      label: 'bill_item_type.field.applicability',
                      value: billItemType.applicability
                        .map((applicability) => t(`core.enum.applicability.${applicability}`))
                        .join(', '),
                    },
                  ],
                },
                {
                  label: 'bill_item_type.section_title.other_data',
                  value: [
                    {
                      label: 'bill_item_type.field.accounting_item',
                      value: billItemType.defaultAccountingItem
                        ? `(${billItemType.defaultAccountingItem.internalCode}) ${billItemType.defaultAccountingItem.description}`
                        : null,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="bill_item_type.tab.rates"
              items={[
                {
                  label: 'bill_item_type.section_title.active_contracts',
                  value: [
                    {
                      grid: 4,
                      label: 'common.enum.vat_rate.RATE',
                      value: billItemType.activeSubjectVR?.description,
                    },
                    {
                      grid: 4,
                      label: 'common.enum.vat_rate.EXEMPT',
                      value: billItemType.activeExemptVR?.description,
                    },
                    {
                      grid: 4,
                      label: 'common.enum.vat_rate.NON_TAXABLE',
                      value: billItemType.activeNonTaxableVR?.description,
                    },
                  ],
                },
                {
                  label: 'bill_item_type.section_title.passive_contracts',
                  value: [
                    {
                      grid: 4,
                      label: 'common.enum.vat_rate.RATE',
                      value: billItemType.passiveSubjectVR?.description,
                    },
                    {
                      grid: 4,
                      label: 'common.enum.vat_rate.EXEMPT',
                      value: billItemType.passiveExemptVR?.description,
                    },
                    {
                      grid: 4,
                      label: 'common.enum.vat_rate.NON_TAXABLE',
                      value: billItemType.passiveNonTaxableVR?.description,
                    },
                  ],
                },
                {
                  label: 'bill_item_type.section_title.administration',
                  value: [
                    {
                      grid: 4,
                      label: `common.enum.vat_rate.${billItemType.administrationVatRateType!}`,
                      value: billItemType.administrationVR?.description,
                    },
                  ],
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="bill_item_type.dialog.create.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
