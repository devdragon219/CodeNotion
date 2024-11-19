import { Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitHistoryProps } from './History.types';

export const CadastralUnitHistory = ({ control, readonly }: CadastralUnitHistoryProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const history = useWatch({ control, name: 'history' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {readonly && history.length === 0 ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="cadastral_unit.section_title.no_history" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'cadastral_unit.field.cadastral_unit_code',
              'cadastral_unit.field.history_since',
              'cadastral_unit.field.history_until',
              'cadastral_unit.field.inspection_protocol_number',
              'cadastral_unit.field.income_macro_category',
              'cadastral_unit.field.income_micro_category',
              'cadastral_unit.field.income_metric_amount',
              'cadastral_unit.field.cadastral_unit_status',
              'cadastral_unit.field.history_date',
              'cadastral_unit.field.history_estate_unit',
            ]}
            rows={history.map((entry) => [
              entry.internalCode,
              parseStringToLocalizedDate(entry.since, language),
              parseStringToLocalizedDate(entry.until, language),
              entry.inspection?.protocolNumber,
              entry.income.macroCategory,
              entry.income.microCategory,
              entry.income.metricAmount,
              t(`common.enum.cadastral_unit_status.${entry.status}`),
              parseStringToLocalizedDate(entry.lastRelevantChangeDate, language),
              entry.estateUnit.internalCode,
            ])}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
