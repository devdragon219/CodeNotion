import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { WorkTeamCreateDialog } from '../../../../components/dialogs/WorkTeam/WorkTeam';
import { WorkTeamWorkersDialog } from '../../../../components/dialogs/WorkTeam/Workers/Workers';
import { RawFeature } from '../../../../enums/RawFeature';
import { WorkTeamFragment } from '../../../../gql/RealGimm.Web.WorkTeam.fragment';
import {
  DeleteWorkTeamsDocument,
  ExportWorkTeamsDocument,
  GetWorkTeamsQueryVariables,
  useAddWorkTeamMutation,
  useGetWorkTeamsQuery,
} from '../../../../gql/RealGimm.Web.WorkTeam.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { WorkTeamFormInput } from '../../../../interfaces/FormInputs/WorkTeam';
import { getWorkTeamsColumns } from '../../../../utils/workTeam/getWorkTeamsColumns';
import { parseWorkTeamFormInputToWorkTeamInput } from '../../../../utils/workTeam/parseWorkTeamFormInput';

export default function WorkTeams() {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.FCLT_CONFIG);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    initialState,
    pause,
    variables,
    handleDelete,
    handleExport,
    handleFilter,
    handlePageChange,
    handleSort,
    setInitialState,
  } = useTable<GetWorkTeamsQueryVariables>();
  const [queryState, reexecuteQuery] = useGetWorkTeamsQuery({ pause, variables });
  const [, createWorkTeamMutation] = useAddWorkTeamMutation();
  const [loading, setLoading] = useState(false);
  const [workersDialogProps, setWorkersDialogProps] = useState<WorkTeamFragment | null>(null);
  const [isWorkTeamCreateDialogOpen, setWorkTeamCreateDialogOpen] = useState(false);
  const workTeams = useMemo(() => queryState.data?.workTeam.listWorkTeams, [queryState.data]);

  const handleOpenWorkTeamCreateDialog = useCallback(() => {
    setWorkTeamCreateDialogOpen(true);
  }, []);

  const handleCloseWorkTeamCreateDialog = useCallback(() => {
    setWorkTeamCreateDialogOpen(false);
  }, []);
  const handleSaveCreateWorkTeam = useCallback(
    async (workTeam: WorkTeamFormInput) => {
      setLoading(true);
      const result = await createWorkTeamMutation({
        input: parseWorkTeamFormInputToWorkTeamInput(workTeam),
      });
      setLoading(false);
      if (result.data?.workTeam.add.isSuccess) {
        showSnackbar(t('work_team.feedback.create'), 'success');
        handleCloseWorkTeamCreateDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.workTeam.add.validationErrors);
      }
    },
    [createWorkTeamMutation, showSnackbar, t, handleCloseWorkTeamCreateDialog, reexecuteQuery, showError],
  );

  const showAllButton = useCallback(
    (row: WorkTeamFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setWorkersDialogProps(row);
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('core.button.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseWorkersDialog = useCallback(() => {
    setWorkersDialogProps(null);
  }, []);

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <CardHeader title={t('work_team.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getWorkTeamsColumns(showAllButton)}
          empty="work_team.text.no_work_teams"
          initialState={initialState}
          rows={workTeams?.nodes ?? []}
          totalCount={workTeams?.totalCount ?? 0}
          getRowId={({ id }) => String(id)}
          onAdd={canCreate ? handleOpenWorkTeamCreateDialog : undefined}
          onDelete={canDelete ? handleDelete('work_team', DeleteWorkTeamsDocument, reexecuteQuery) : undefined}
          onEdit={
            canUpdate
              ? (row) => {
                  navigate(`/app/maintenance/work-teams/${row.id}`, { state: { readonly: false } });
                }
              : undefined
          }
          onExport={canRead ? handleExport('id', ExportWorkTeamsDocument) : undefined}
          onFilter={handleFilter()}
          onPageChange={handlePageChange(workTeams?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={
            canRead
              ? (row) => {
                  navigate(`/app/maintenance/work-teams/${row.id}`);
                }
              : undefined
          }
          useColumnVisibility={false}
        />
      </CardContent>
      {workersDialogProps && (
        <WorkTeamWorkersDialog workers={workersDialogProps.workers} onClose={handleCloseWorkersDialog} />
      )}
      {isWorkTeamCreateDialogOpen && (
        <WorkTeamCreateDialog onClose={handleCloseWorkTeamCreateDialog} onSave={handleSaveCreateWorkTeam} />
      )}
    </Card>
  );
}
