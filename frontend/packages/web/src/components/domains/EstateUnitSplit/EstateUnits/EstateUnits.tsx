import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { PrimaryTable, StepForm } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { isOfType, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { TableState } from '@tanstack/react-table';
import { add } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';
import { EstateUnitSplitFormInput } from '../../../../interfaces/FormInputs/EstateUnitActions';
import { getEstateUnitsColumns } from '../../../../utils/estateUnit/getEstateUnitsColumns';
import { getEstateUnitSplitEstateUnitsSchema } from '../../../../utils/estateUnitActions/schemas/splitEstateUnits';
import { EstateUnitSplitDialog } from '../../../wizards/EstateUnitSplit/EstateUnitSplit';
import { EstateUnitSplitDialogInput } from '../../../wizards/EstateUnitSplit/EstateUnitSplit.types';
import { EstateUnitSplitEstateUnitsStepProps } from './EstateUnits.types';

export const EstateUnitSplitEstateUnitsStep = ({
  estateUnitSplit,
  initialStates,
  onBack,
  onChange,
  onChangeInitialStates,
  onError,
  onNext,
}: EstateUnitSplitEstateUnitsStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<EstateUnitSplitFormInput>({
    defaultValues: estateUnitSplit,
    resolver: yupResolver(getEstateUnitSplitEstateUnitsSchema(t)),
  });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'toEstateUnits' });
  type EstateUnitFieldArray = (typeof fields)[number];

  const [estateUnitSplitDialogProps, setEstateUnitSplitDialogProps] = useState<{
    input?: EstateUnitSplitDialogInput;
    open: boolean;
  }>({ open: false });

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      onChange(formValues as EstateUnitSplitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.toEstateUnits) {
      onError(errors.toEstateUnits.message);
    }
    // eslint-disable-next-line
  }, [errors.toEstateUnits]);

  const handleCloseEstateUnitDialog = useCallback(() => {
    setEstateUnitSplitDialogProps({ open: false });
  }, []);
  const handleEditEstateUnit = useCallback(
    (estateUnit: EstateUnitFieldArray) => {
      const index = fields.indexOf(estateUnit);
      setEstateUnitSplitDialogProps({
        input: { estateUnit, index, initialState: initialStates[index] },
        open: true,
      });
    },
    [fields, initialStates],
  );
  const handleSaveEstateUnit = useCallback(
    (value: EstateUnitFormInput | EstateUnitSplitDialogInput, initialState: Partial<TableState>) => {
      if (isOfType<EstateUnitSplitDialogInput>(value, ['index'])) {
        update(value.index, value.estateUnit);
        onChangeInitialStates((initialStates) =>
          initialStates.map((it, index) => (index === value.index ? initialState : it)),
        );
      } else {
        append(value);
        onChangeInitialStates((initialStates) => [...initialStates, initialState]);
      }
      handleCloseEstateUnitDialog();
    },
    [append, update, onChangeInitialStates, handleCloseEstateUnitDialog],
  );

  const handleAddEstateUnit = useCallback(() => {
    setEstateUnitSplitDialogProps({ open: true });
  }, []);
  const handleRemoveEstateUnit = useCallback(
    (estateUnit: EstateUnitFieldArray | EstateUnitFieldArray[], onComplete: () => void) => {
      const index = Array.isArray(estateUnit)
        ? estateUnit.map((estateUnit) => fields.indexOf(estateUnit))
        : fields.indexOf(estateUnit);
      remove(index);
      onChangeInitialStates((initialStates) => initialStates.filter((_, idx) => idx !== index));
      onComplete();
    },
    [fields, remove, onChangeInitialStates],
  );

  const cadastralUnitMinDate = useMemo(() => {
    const minDate = parseStringToDate(estateUnitSplit.fromEstateUnit?.currentCadastralUnit?.since);
    if (!minDate) {
      return undefined;
    }
    return add(minDate, { days: 1 });
  }, [estateUnitSplit.fromEstateUnit]);

  const estateUnitMinDate = useMemo(() => {
    const minDate = estateUnitSplit.fromEstateUnit?.ownershipStartDate;
    if (!minDate) {
      return undefined;
    }
    return add(minDate, { days: 1 });
  }, [estateUnitSplit.fromEstateUnit]);

  return (
    <StepForm onBack={onBack} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {fields.length !== 0 && (
          <Grid2 size={12}>
            <PrimaryTable
              color="secondary"
              columns={getEstateUnitsColumns<EstateUnitFieldArray>(language, t)}
              rows={fields}
              getRowId={({ key }) => key}
              onDelete={handleRemoveEstateUnit}
              onEdit={handleEditEstateUnit}
              usePagination={false}
              useRowSelection={false}
              useSelectedRows={false}
            />
          </Grid2>
        )}
        {estateUnitSplitDialogProps.open && (
          <EstateUnitSplitDialog
            alreadyInUseInternalCodes={fields
              .map(({ internalCode }) => internalCode)
              .filter((it) => it !== '' && it !== estateUnitSplitDialogProps.input?.estateUnit.internalCode)}
            cadastralUnitMinDate={cadastralUnitMinDate}
            cityName={estateUnitSplit.fromEstateUnit!.address.city!.name}
            estateId={estateUnitSplit.fromEstateUnit!.estate.id}
            estateUnitMinDate={estateUnitMinDate}
            input={estateUnitSplitDialogProps.input}
            onClose={handleCloseEstateUnitDialog}
            onSave={handleSaveEstateUnit}
          />
        )}
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddEstateUnit}>
            {t('estate_unit_split.action.add_estate_unit')}
          </Button>
        </Grid2>
      </Grid2>
    </StepForm>
  );
};
