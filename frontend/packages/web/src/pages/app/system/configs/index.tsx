import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { ConfigFunction } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfigDialog } from '../../../../components/dialogs/Config/Config';
import { RawFeature } from '../../../../enums/RawFeature';
import { ConfigFragment } from '../../../../gql/RealGimm.Web.Config.fragment';
import {
  GetConfigsQueryVariables,
  useGetConfigsQuery,
  useUpdateConfigMutation,
} from '../../../../gql/RealGimm.Web.Config.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { ConfigFormInput } from '../../../../interfaces/FormInputs/Config';
import { getConfigsColumns } from '../../../../utils/config/getConfigsColumns';
import { parseConfigToConfigFormInput } from '../../../../utils/config/parseConfigFragment';

export default function Configs() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { canRead, canUpdate } = useFeature(RawFeature.ADMIN_CONFIG);
  const { initialState, pause, variables, handleFilter, handleSort, setInitialState } =
    useTable<GetConfigsQueryVariables>();
  const { showError, showSnackbar } = useSnackbar();
  const [, updateConfigMutation] = useUpdateConfigMutation();
  const [loading, setLoading] = useState(false);
  const [queryState, reexecuteQuery] = useGetConfigsQuery({ pause, variables });

  const configs: ConfigFormInput[] = useMemo(() => {
    const groupedByFunction = Object.values(queryState.data?.admin.listConfigs ?? []).reduce<
      Record<string, ConfigFragment[]>
    >(
      (acc, config) => ({
        ...acc,
        [config.function]: [...(acc[config.function] ?? []), config],
      }),
      {},
    );

    return Object.entries(groupedByFunction).map<ConfigFormInput>(([functionName, configs], i) => ({
      configId: i,
      function: functionName as ConfigFunction,
      lastUpdated: null,
      name: '',
      subRows: configs.map(parseConfigToConfigFormInput),
      value: '',
    }));
  }, [queryState.data]);

  const [configDialogProps, setConfigDialogProps] = useState<{
    input?: ConfigFormInput;
    open: boolean;
    readonly?: boolean;
  }>({
    open: false,
  });

  const handleCloseConfigDialog = useCallback(() => {
    setConfigDialogProps({ open: false });
  }, []);

  const handleEditConfig = useCallback((row: ConfigFormInput) => {
    setConfigDialogProps({
      input: row,
      open: true,
    });
  }, []);

  const handleViewConfig = useCallback((row: ConfigFormInput) => {
    if (row.subRows) return;
    setConfigDialogProps({
      input: row,
      open: true,
      readonly: true,
    });
  }, []);

  const handleSaveConfig = useCallback(
    async (value: ConfigFormInput) => {
      const saveMainUsageType = async () => {
        const result = await updateConfigMutation({
          function: value.function,
          name: value.name,
          value: value.value,
        });
        return result.data?.admin.updateConfig;
      };
      setLoading(true);
      const result = await saveMainUsageType();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t('config.feedback.update'), 'success');
        handleCloseConfigDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [handleCloseConfigDialog, reexecuteQuery, showError, showSnackbar, t, updateConfigMutation],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('config.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getConfigsColumns(t, language)}
          empty="config.text.no_configs"
          hideRowActions={(row) => !!row.subRows}
          initialState={initialState}
          rows={configs}
          rowActionsVariant="inline"
          useColumnVisibility={false}
          usePagination={false}
          useRowSelection={false}
          useRowExpandCollapse
          getRowId={({ function: functionName, name }) => `${functionName}_${name}`}
          getSubRows={(row) => row.subRows}
          onEdit={canUpdate ? handleEditConfig : undefined}
          onFilter={handleFilter()}
          onSort={handleSort()}
          onStateChange={setInitialState}
          onView={canRead ? handleViewConfig : undefined}
        />
      </CardContent>
      {configDialogProps.open && (
        <ConfigDialog
          input={configDialogProps.input}
          readonly={configDialogProps.readonly}
          onSave={handleSaveConfig}
          onClose={handleCloseConfigDialog}
        />
      )}
    </Card>
  );
}
