import { Box, Card, CardContent, CardHeader, Theme, Typography, useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { useAuth } from '../../contexts/auth/hook';
import { useSidebar } from '../../contexts/sidebar/hook';
import { useSnackbar } from '../../contexts/snackbar/hook';
import { ValidationErrorFragment } from '../../gql/RealGimm.WebCommon.ValidationError.fragment';
import { WidgetSection } from '../../gql/types';
import { DashboardBuilderFormInput } from '../../interfaces/FormInputs/DashboardBuilder';
import { MenuItem } from '../../interfaces/Menu';
import { getEmptyDashboardBuilderFormInput } from '../../utils/dashboardBuilder/initialValues';
import { parseDashboardBuilderFormInputToWidgetSectionsInputs } from '../../utils/dashboardBuilder/parseDashboardBuilderFormInput';
import { parseWidgetSectionsToDashboardBuilderFormInput } from '../../utils/dashboardBuilder/parseWidgetSections';
import { findValueForKey } from '../../utils/objectUtils';
import { BlockerDialog } from '../BlockerDialog/BlockerDialog';
import { CardActions } from '../CardActions/CardActions';
import { DashboardBuilder } from '../DashboardBuilder/DashboardBuilder';
import { Form } from '../Form/Form';
import { Loader } from '../Loader/Loader';
import { DashboardProps } from './Dashboard.types';

export const Dashboard = ({
  mutation,
  mutationKey,
  query,
  queryKey,
  shouldRedirect,
  title,
  widgetConfigurations,
}: DashboardProps) => {
  const { t } = useTranslation();
  const { permissions } = useAuth();
  const navigate = useNavigate();
  const [readonly, setReadonly] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showSnackbar, showError } = useSnackbar();
  const client = useClient();
  const [dashboard, setDashboard] = useState<DashboardBuilderFormInput>();
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
  const { handleToggleSidebar } = useSidebar();
  const matchDownLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const widgetTypes = useMemo(() => widgetConfigurations.map(({ type }) => type), [widgetConfigurations]);

  const checkPermissions = useCallback(() => {
    if (!shouldRedirect) return;

    const features = Object.keys(permissions).filter(
      (featureCode) => !shouldRedirect.unsupportedFeatures.includes(featureCode),
    );

    const findAllowedRoute = (items: MenuItem[]): string | undefined => {
      for (const item of items) {
        if (item.type === 'group') {
          const route = findAllowedRoute(item.children);
          if (route) return route;
        } else if (!item.feature || features.includes(item.feature)) {
          return item.url;
        }
      }

      return undefined;
    };

    for (const config of shouldRedirect.menu) {
      const route = findAllowedRoute(config.children);
      if (route) {
        navigate(route, { replace: true });
        return;
      }
    }
  }, [navigate, permissions, shouldRedirect]);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    const result: OperationResult = await client.query(query, {
      pause: !shouldRedirect,
    });
    setLoading(false);
    const dashboard = findValueForKey(queryKey, result.data);
    if (!dashboard) return getEmptyDashboardBuilderFormInput();
    return parseWidgetSectionsToDashboardBuilderFormInput(dashboard as WidgetSection[], widgetTypes);
  }, [client, query, queryKey, shouldRedirect, widgetTypes]);

  const {
    control,
    formState: { isValid: canSave },
    handleSubmit,
    reset,
    watch,
    getValues,
  } = useForm<DashboardBuilderFormInput>({
    defaultValues: fetchDashboard,
  });

  useEffect(() => {
    checkPermissions();
    const { unsubscribe } = watch((formValues) => {
      setDashboard(formValues as DashboardBuilderFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(dashboard);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const handleCancel = useCallback(() => {
    if (!matchDownLg) {
      handleToggleSidebar(true, () => {
        reset();
        setReadonly(true);
      });
    } else {
      reset();
      setReadonly(true);
    }
  }, [handleToggleSidebar, matchDownLg, reset]);

  const handleEdit = useCallback(() => {
    handleToggleSidebar(false, () => {
      setReadonly(false);
    });
  }, [handleToggleSidebar]);

  const onSubmit = useCallback(
    async (dashboard: DashboardBuilderFormInput) => {
      setLoading(true);
      const result = await client.mutation(mutation, {
        inputs: parseDashboardBuilderFormInputToWidgetSectionsInputs(dashboard),
      });
      setLoading(false);
      const data = findValueForKey(mutationKey, result.data) as
        | {
            isSuccess: boolean;
            validationErrors?: ValidationErrorFragment[];
          }
        | undefined;
      if (data?.isSuccess) {
        showSnackbar(t('common.component.dashboard.feedback.update'), 'success');
        const updateDashboard = async () => {
          setReadonly(true);
          const updatedDashboard = await fetchDashboard();
          setDashboard(updatedDashboard);
          setSubmitSuccessful(true);
        };

        if (!matchDownLg) {
          handleToggleSidebar(true, updateDashboard);
        } else {
          updateDashboard();
        }
      } else {
        showError(data?.validationErrors);
      }
    },
    [client, mutation, mutationKey, showSnackbar, t, matchDownLg, fetchDashboard, handleToggleSidebar, showError],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  return !shouldRedirect ? (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      <Card sx={{ overflow: 'unset' }}>
        <CardHeader
          title={t(title)}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              editProps={{
                color: 'tertiary',
                label: 'common.component.dashboard.actions.personalize',
                variant: 'outlined',
              }}
              readonly={readonly}
              onCancel={handleCancel}
              onEdit={handleEdit}
            />
          }
        />
        {dashboard && (
          <CardContent>
            {readonly && (dashboard.sections.length === 0 || dashboard.sections[0].rows.length === 0) ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  pb: 8,
                }}
              >
                <Typography variant="h5">{t('common.component.dashboard.text.no_widgets')}</Typography>
              </Box>
            ) : (
              <Controller
                name="sections"
                control={control}
                render={({ field }) => (
                  <DashboardBuilder {...field} readonly={readonly} widgetConfigurations={widgetConfigurations} />
                )}
              />
            )}
          </CardContent>
        )}
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  ) : (
    <></>
  );
};
