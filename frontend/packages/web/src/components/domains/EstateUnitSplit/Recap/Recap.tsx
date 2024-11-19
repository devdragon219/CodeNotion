import { Grid2 } from '@mui/material';
import {
  PrimaryTable,
  RecapSection,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { getEstateUnitsColumns } from '../../../../utils/estateUnit/getEstateUnitsColumns';
import { EstateUnitSplitRecapStepProps } from './Recap.types';

export const EstateUnitSplitRecapStep = ({
  estateUnitSplit,
  onBack,
  onEdit,
  onSave,
}: EstateUnitSplitRecapStepProps) => {
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
    onSave(estateUnitSplit);
  }, [estateUnitSplit, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="estate_unit_split.tab.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_split.tab.estate_unit"
              items={
                <PrimaryTable
                  color="secondary"
                  columns={getEstateUnitsColumns(language, t, { useFilter: false })}
                  rows={[estateUnitSplit.fromEstateUnit!]}
                  getRowId={({ id }) => String(id)}
                  useColumnVisibility={false}
                  usePagination={false}
                  useRowSelection={false}
                  useSelectedRows={false}
                />
              }
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="estate_unit_split.tab.estate_units"
              items={
                <PrimaryTable
                  color="secondary"
                  columns={getEstateUnitsColumns<EstateUnitFormInput>(language, t, { useFilter: false })}
                  rows={estateUnitSplit.toEstateUnits}
                  getRowId={({ estateUnitId }) => String(estateUnitId)}
                  useColumnVisibility={false}
                  usePagination={false}
                  useRowSelection={false}
                  useSelectedRows={false}
                />
              }
              onEdit={handleEdit(1)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions completeLabel="estate_unit_split.action.save" onBack={onBack} onComplete={handleComplete} />
    </>
  );
};
