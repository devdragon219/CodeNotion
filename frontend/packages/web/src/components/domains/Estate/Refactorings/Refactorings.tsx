import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2, Typography } from '@mui/material';
import { Loader, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { useGetEstateUnitsQuery } from '../../../../gql/RealGimm.Web.EstateUnit.operation';
import { EstateRefactoringFormInput } from '../../../../interfaces/FormInputs/Estate';
import { EstateRefactoringDialog } from '../../../wizards/EstateRefactoring/EstateRefactoring';
import { EstateRefactoringDialogInput } from '../../../wizards/EstateRefactoring/EstateRefactoring.types';
import { EstateUnitsDialog } from './Dialog/Dialog';
import { EstateRefactoringsProps } from './Refactorings.types';

export const EstateRefactorings = ({ control, readonly }: EstateRefactoringsProps) => {
  const { t } = useTranslation();
  const estateId = useWatch({ control, name: 'estateId' });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'refactorings' });
  const [refactoringDialogProps, setRefactoringDialogProps] = useState<{
    input?: EstateRefactoringDialogInput;
    open: boolean;
  }>({
    open: false,
  });
  const [estateUnitsDialogProps, setEstateUnitsDialogProps] = useState<{
    estateUnitIds?: number[];
    open: boolean;
  }>({
    open: false,
  });
  const [queryState] = useGetEstateUnitsQuery({
    variables: {
      where: {
        estate: {
          id: {
            eq: estateId,
          },
        },
      },
    },
  });

  const hasEstateUnits = useMemo(
    () => (queryState.data?.estateUnit.listEstateUnits?.totalCount ?? 0) !== 0,
    [queryState.data],
  );

  const handleOpenEstateUnitsDialog = useCallback(
    (estateUnits: EstateUnitFragment[]) => () => {
      setEstateUnitsDialogProps({
        estateUnitIds: estateUnits.map(({ id }) => id),
        open: true,
      });
    },
    [],
  );
  const handleCloseEstateUnitsDialog = useCallback(() => {
    setEstateUnitsDialogProps({
      open: false,
    });
  }, []);

  const handleCloseRefactoringDialog = useCallback(() => {
    setRefactoringDialogProps({ open: false });
  }, []);
  const handleEditRefactoring = useCallback(
    (index: number) => {
      setRefactoringDialogProps({
        input: { estateRefactoring: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveRefactoring = useCallback(
    (value: EstateRefactoringFormInput, index?: number) => {
      if (index !== undefined) {
        update(index, value);
      } else {
        append(value);
      }
      handleCloseRefactoringDialog();
    },
    [append, update, handleCloseRefactoringDialog],
  );

  const handleAddRefactoring = useCallback(() => {
    setRefactoringDialogProps({ open: true });
  }, []);
  const handleRemoveRefactoring = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryState.fetching && <Loader />}
      {(readonly && fields.length === 0) || !hasEstateUnits ? (
        <SectionTitle
          sx={{ justifyContent: 'center' }}
          value={`estate.section_title.${!hasEstateUnits ? 'no_estate_units_available' : 'no_refactorings'}`}
        />
      ) : fields.length !== 0 ? (
        <SectionTitle value="estate.section_title.refactorings" />
      ) : (
        <></>
      )}
      {fields.length !== 0 && (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'estate.field.refactoring_year',
              'estate.field.refactoring_building_permit_year',
              'estate.field.refactoring_condition',
              'estate.field.refactoring_age_condition',
              'estate.field.refactoring_estate_units',
            ]}
            rows={fields.map((entry) => [
              entry.referenceYear,
              entry.buildingPermitYear,
              entry.condition ? t(`common.enum.unit_condition.${entry.condition}`) : null,
              entry.ageCoefficient,
              entry.estateUnits.length === 1 ? (
                entry.estateUnits[0].internalCode
              ) : (
                <Typography variant="link" onClick={handleOpenEstateUnitsDialog(entry.estateUnits)}>
                  {t('core.button.show_all')}
                </Typography>
              ),
            ])}
            onRowDelete={readonly ? undefined : handleRemoveRefactoring}
            onRowEdit={readonly ? undefined : handleEditRefactoring}
          />
        </Grid2>
      )}
      {!readonly && hasEstateUnits && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddRefactoring}>
            {t('estate.action.add_refactoring')}
          </Button>
        </Grid2>
      )}
      {refactoringDialogProps.open && (
        <EstateRefactoringDialog
          estateId={estateId!}
          input={refactoringDialogProps.input}
          onClose={handleCloseRefactoringDialog}
          onSave={handleSaveRefactoring}
        />
      )}
      {estateUnitsDialogProps.open && (
        <EstateUnitsDialog
          estateUnitIds={estateUnitsDialogProps.estateUnitIds}
          onClose={handleCloseEstateUnitsDialog}
        />
      )}
    </Grid2>
  );
};
