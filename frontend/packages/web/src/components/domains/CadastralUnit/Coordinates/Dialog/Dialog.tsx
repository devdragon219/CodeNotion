import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CadastralUnitFormInput } from '../../../../../interfaces/FormInputs/CadastralUnit';
import { getEmptyCadastralCoordinatesFormInput } from '../../../../../utils/cadastralUnit/initialValues';
import { getCadastralUnitCoordinatesSchema } from '../../../../../utils/cadastralUnit/schemas/coordinates';
import { CoordinatesField } from '../Field/Field';
import { CoordinatesDialogProps } from './Dialog.types';

export const CoordinatesDialog = ({ coordinateType, input, onClose, onSave }: CoordinatesDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CadastralUnitFormInput>({
    defaultValues: {
      coordinates: input ? [input.coordinates] : [getEmptyCadastralCoordinatesFormInput(coordinateType)],
    },
    resolver: yupResolver(getCadastralUnitCoordinatesSchema(coordinateType, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'coordinates',
  });

  const handleAddCoordinates = useCallback(() => {
    append(getEmptyCadastralCoordinatesFormInput(coordinateType));
  }, [coordinateType, append]);

  const onSubmit = useCallback(
    (formValues: CadastralUnitFormInput) => {
      onSave(
        input
          ? {
              ...input,
              coordinates: formValues.coordinates[0],
            }
          : formValues.coordinates,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`cadastral_unit.dialog.cadastral_coordinates.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="cadastral_unit.section_title.cadastral_coordinates" />
            {input ? (
              <Grid2 size={12}>
                <CoordinatesField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <CoordinatesField control={control} errors={errors} index={index} />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                <Grid2 size={12}>
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddCoordinates}
                  >
                    {t('cadastral_unit.action.add_cadastral_coordinates')}
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
