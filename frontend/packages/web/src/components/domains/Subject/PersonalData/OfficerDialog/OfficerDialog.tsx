import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { OfficerType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';
import { getEmptySubjectOfficerFormInput } from '../../../../../utils/subject/initialValues';
import { getSubjectOfficersSchema } from '../../../../../utils/subject/schemas/personalData';
import { OfficerField } from '../OfficerField/OfficerField';
import { OfficerDialogProps } from './OfficerDialog.types';

export const OfficerDialog = ({
  entryStatus,
  input,
  required,
  selectedOfficers,
  useOfficerType,
  onClose,
  onSave,
}: OfficerDialogProps) => {
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
      officers: input
        ? [input.officer]
        : [getEmptySubjectOfficerFormInput(useOfficerType ? null : OfficerType.LegalRepresentative)],
    },
    resolver: yupResolver(getSubjectOfficersSchema(entryStatus, language, t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'officers',
  });

  const handleAddOfficer = useCallback(() => {
    append(getEmptySubjectOfficerFormInput(useOfficerType ? null : OfficerType.LegalRepresentative));
  }, [useOfficerType, append]);

  const onSubmit = useCallback(
    (formValues: SubjectFormInput) => {
      onSave(
        input
          ? {
              ...input,
              officer: formValues.officers[0],
            }
          : formValues.officers,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`subject.dialog.legal_representative.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="subject.section_title.legal_representative" />
            {input ? (
              <Grid2 size={12}>
                <OfficerField
                  control={control}
                  errors={errors}
                  index={0}
                  required={required}
                  selectedOfficers={selectedOfficers}
                  useOfficerType={useOfficerType}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <OfficerField
                            control={control}
                            errors={errors}
                            index={index}
                            required={required}
                            selectedOfficers={[...selectedOfficers, ...fields.filter((_, idx) => idx !== index)]}
                            useOfficerType={useOfficerType}
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
                    onClick={handleAddOfficer}
                  >
                    {t('subject.action.add_legal_representative')}
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
