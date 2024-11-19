import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFormInput } from '../../../interfaces/FormInputs/Subject';
import { getEmptySubjectHeirFormInput } from '../../../utils/subject/initialValues';
import { getSubjectHeirsSchema } from '../../../utils/subject/schemas/personalData';
import { HeirField } from './Field/Field';
import { HeirDialogProps } from './Heir.types';

export const HeirDialog = ({
  input,
  owningManagementSubjectIds,
  selectedHeirs,
  subjectId,
  onClose,
  onSave,
}: HeirDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SubjectFormInput>({
    defaultValues: {
      heirs: input ? [input.heir] : [getEmptySubjectHeirFormInput()],
    },
    resolver: yupResolver(getSubjectHeirsSchema(language, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'heirs',
  });

  const handleAddHeir = useCallback(() => {
    append(getEmptySubjectHeirFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: SubjectFormInput) => {
      onSave(
        input
          ? {
              ...input,
              heir: formValues.heirs[0],
            }
          : formValues.heirs,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`subject.dialog.heir.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="subject.section_title.heir" />
            {input ? (
              <Grid2 size={12}>
                <HeirField
                  control={control}
                  errors={errors}
                  index={0}
                  owningManagementSubjectIds={owningManagementSubjectIds}
                  selectedHeirs={selectedHeirs}
                  subjectId={subjectId}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <HeirField
                            control={control}
                            errors={errors}
                            index={index}
                            owningManagementSubjectIds={owningManagementSubjectIds}
                            selectedHeirs={[...selectedHeirs, ...fields.filter((_, idx) => idx !== index)]}
                            subjectId={subjectId}
                          />
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
                    onClick={handleAddHeir}
                  >
                    {t('subject.action.add_heir')}
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
