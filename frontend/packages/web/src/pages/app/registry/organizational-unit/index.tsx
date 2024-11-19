import { yupResolver } from '@hookform/resolvers/yup';
import { EditTwoTone } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Grid2, IconButton, Paper } from '@mui/material';
import {
  BlockerDialog,
  CardActions,
  ContactsField,
  Form,
  Loader,
  SecondaryTable,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { ContactsFieldValues } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { OperationResult, UseQueryExecute, useClient } from 'urql';

import { OrgUnitCitiesDialog } from '../../../../components/domains/OrgUnit/CitiesDialog/CitiesDialog';
import { OrgUnitGeneralData } from '../../../../components/domains/OrgUnit/GeneralData/GeneralData';
import { RawFeature } from '../../../../enums/RawFeature';
import { CityFragment } from '../../../../gql/RealGimm.Web.City.fragment';
import {
  DeleteOrgUnitDocument,
  GetOrgUnitDocument,
  GetOrgUnitQuery,
  useUpdateGeographicalOrgUnitMutation,
  useUpdateManagementOrgUnitMutation,
} from '../../../../gql/RealGimm.Web.OrgUnit.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { useOrgUnit } from '../../../../hooks/useOrgUnit';
import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';
import { getCountryName } from '../../../../utils/countryUtils';
import { parseOrgUnitFormInputToOrgUnitInput } from '../../../../utils/orgUnit/parseOrgUnitFormInput';
import { parseOrgUnitToOrgUnitFormInput } from '../../../../utils/orgUnit/parseOrgUnitFragment';
import { getOrgUnitSchema } from '../../../../utils/orgUnit/schemas/orgUnit';

export default function OrganizationalUnit() {
  const { canDelete, canUpdate } = useFeature(RawFeature.ANAG_SUBJECT_ORGUNIT);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { reexecuteQuery } = useOutletContext<{ reexecuteQuery: UseQueryExecute }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleDelete } = useOperation();
  const { showError, showSnackbar } = useSnackbar();
  const client = useClient();
  const { checkCanUseInternalCode } = useOrgUnit();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(true);
  const [, updateManagementOrgUnitMutation] = useUpdateManagementOrgUnitMutation();
  const [, updateGeographicalOrgUnitMutation] = useUpdateGeographicalOrgUnitMutation();
  const [orgUnit, setOrgUnit] = useState<OrgUnitFormInput>();
  const debouncedOrgUnit = useDebounce(orgUnit);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [isCitiesDialogOpen, setCitiesDialogOpen] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const goBack = useCallback(() => {
    setTimeout(() => {
      navigate(
        `/app/registry/organizational-units/${OrgUnitType.ManagementHierarchy === orgUnit?.orgUnitType ? 'management' : 'geographical'}`,
        { replace: true },
      );
    });
  }, [navigate, orgUnit?.orgUnitType]);

  const fetchOrgUnit = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetOrgUnitQuery> = await client.query(GetOrgUnitDocument, {
      orgUnitId: Number(id),
    });
    setLoading(false);
    if (!result.data?.orgUnit.orgUnit) return Promise.reject();
    return parseOrgUnitToOrgUnitFormInput(result.data.orgUnit.orgUnit);
  }, [id, client]);

  const handleOpenCitiesDialog = useCallback(() => {
    setCitiesDialogOpen(true);
  }, []);
  const handleCloseCitiesDialog = useCallback(() => {
    setCitiesDialogOpen(false);
  }, []);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    getValues,
  } = useForm<OrgUnitFormInput>({
    defaultValues: fetchOrgUnit,
    resolver: orgUnit ? yupResolver(getOrgUnitSchema(canUseInternalCode, orgUnit.entryStatus, language, t)) : undefined,
  });

  useEffect(() => {
    setReadonly(true);
    const updateOrgUnit = async () => {
      const updatedOrgUnit = await fetchOrgUnit();
      setOrgUnit(updatedOrgUnit);
      setSubmitSuccessful(true);
    };
    void updateOrgUnit();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (debouncedOrgUnit) {
      checkCanUseInternalCode(debouncedOrgUnit.internalCode, debouncedOrgUnit.orgUnitId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedOrgUnit?.internalCode, debouncedOrgUnit?.orgUnitId]);

  useEffect(() => {
    const { unsubscribe } = watch((formValues) => {
      setOrgUnit(formValues as OrgUnitFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(orgUnit);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const handleSaveCities = useCallback(
    (cities: CityFragment[]) => {
      setValue('cities', cities);
      handleCloseCitiesDialog();
    },
    [handleCloseCitiesDialog, setValue],
  );

  const onSubmit = useCallback(
    async (orgUnit: OrgUnitFormInput) => {
      const createOrgUnit = async () => {
        const input = parseOrgUnitFormInputToOrgUnitInput(orgUnit);

        if (orgUnit.orgUnitType === OrgUnitType.GeographicalHierarchy) {
          const result = await updateGeographicalOrgUnitMutation({
            input,
          });
          return result.data?.orgUnit.updateGeographicalOrgUnit;
        } else {
          const result = await updateManagementOrgUnitMutation({
            input,
          });
          return result.data?.orgUnit.updateManagementOrgUnit;
        }
      };

      setLoading(true);
      const result = await createOrgUnit();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t('org_unit.feedback.update'), 'success');
        setReadonly(true);
        const updatedOrgUnit = await fetchOrgUnit();
        setOrgUnit(updatedOrgUnit);
        setSubmitSuccessful(true);
        reexecuteQuery();
        return Promise.resolve();
      } else {
        showError(result?.validationErrors);
        return Promise.reject();
      }
    },
    [
      updateGeographicalOrgUnitMutation,
      updateManagementOrgUnitMutation,
      showSnackbar,
      t,
      fetchOrgUnit,
      reexecuteQuery,
      showError,
    ],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    reexecuteQuery();
    goBack();
  }, [goBack, reexecuteQuery]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Paper variant="outlined">
        <Card>
          <CardHeader
            title={orgUnit?.entryDescription}
            titleTypographyProps={{ variant: 'h3' }}
            action={
              <CardActions
                editProps={{
                  color: 'secondary',
                }}
                readonly={readonly}
                onCancel={handleCancel}
                onDelete={canDelete ? handleDelete('org_unit', DeleteOrgUnitDocument, onDelete) : undefined}
                onEdit={canUpdate ? handleEdit : undefined}
              />
            }
            sx={(theme) => ({
              [theme.breakpoints.down('lg')]: {
                gap: 2,
                flexDirection: 'column-reverse',
                alignItems: 'flex-start',
                '& :last-child': {
                  alignSelf: 'flex-end',
                },
              },
            })}
          />
          <CardContent sx={{ px: { xs: 3, lg: 6 } }}>
            {orgUnit && (
              <Grid2 container spacing={{ xs: 2, sm: 3 }}>
                <Grid2 size={12}>
                  <OrgUnitGeneralData
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                    trigger={trigger}
                  />
                </Grid2>
                {orgUnit.orgUnitType === OrgUnitType.GeographicalHierarchy && (
                  <>
                    <SectionTitle
                      actions={
                        !readonly ? (
                          <IconButton onClick={handleOpenCitiesDialog}>
                            <EditTwoTone />
                          </IconButton>
                        ) : undefined
                      }
                      sx={{ justifyContent: 'flex-start' }}
                      value="org_unit.section_title.geographical_data"
                    />
                    <Grid2 size={12}>
                      <SecondaryTable
                        columns={['org_unit.field.associated_city', 'org_unit.field.county', 'org_unit.field.country']}
                        rows={orgUnit.cities.map(({ name, countyName, countryISO }) => [
                          name,
                          countyName,
                          getCountryName(countryISO, language),
                        ])}
                      />
                    </Grid2>
                    {isCitiesDialogOpen && (
                      <OrgUnitCitiesDialog
                        input={orgUnit.cities}
                        onClose={handleCloseCitiesDialog}
                        onSave={handleSaveCities}
                      />
                    )}
                  </>
                )}
                <Grid2 size={12}>
                  <ContactsField
                    control={control as unknown as Control<ContactsFieldValues>}
                    readonly={readonly}
                    errors={errors}
                    mode={FormMode.Edit}
                  />
                </Grid2>
              </Grid2>
            )}
          </CardContent>
        </Card>
      </Paper>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
