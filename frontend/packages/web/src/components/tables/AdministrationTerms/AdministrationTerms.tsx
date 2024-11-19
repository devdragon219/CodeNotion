import { AddCircleOutline, FileOpenOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { RawFeature } from '../../../enums/RawFeature';
import { useGetAdministrationQuery } from '../../../gql/RealGimm.Web.Administration.operation';
import { AdministrationTermFragment } from '../../../gql/RealGimm.Web.AdministrationTerm.fragment';
import {
  DeleteAdministrationTermsDocument,
  GetAdministrationTermsQueryVariables,
  useCreateAdministrationTermMutation,
  useGetAdministrationTermsQuery,
} from '../../../gql/RealGimm.Web.AdministrationTerm.operation';
import { useFeature } from '../../../hooks/useFeature';
import { AdministrationTermFormInput } from '../../../interfaces/FormInputs/AdministrationTerm';
import { AdministrationTermInstallmentFormInput } from '../../../interfaces/FormInputs/AdministrationTermInstallment';
import { parseAdministrationToAdministrationFormInput } from '../../../utils/administration/parseAdministrationFragment';
import { getAdministrationTermsColumns } from '../../../utils/administrationTerm/getAdministrationTermsColumns';
import { parseAdministrationTermFormInputToAdministrationTermInput } from '../../../utils/administrationTerm/parseAdministrationTermFormInput';
import { parseAdministrationTermInstallmentToAdministrationTermInstallmentFormInput } from '../../../utils/administrationTerm/parseAdministrationTermFragment';
import { AdministrationTermCreateDialog } from '../../wizards/AdministrationTerm/AdministrationTerm';
import { AdministrationTermsTableProps } from './AdministrationTerms.types';
import { AdministrationTermTableInstallmentsDialog } from './Dialog/Dialog';

export const AdministrationTermsTable = ({ readonly, onChange }: AdministrationTermsTableProps) => {
  const { canRead, canUpdate, canCreate, canDelete } = useFeature(RawFeature.PROP_BILL_BASE);
  const { id } = useParams();
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetAdministrationTermsQueryVariables>((variables) => ({
      ...variables,
      administrationId: Number(id),
    }));
  const [queryState, reexecuteQuery] = useGetAdministrationTermsQuery({ pause, variables });
  const [, createAdministrationTerm] = useCreateAdministrationTermMutation();
  const [loading, setLoading] = useState(false);
  const [administrationTermInstallmentsDialogProps, setAdministrationTermInstallmentsDialogProps] = useState<
    AdministrationTermInstallmentFormInput[] | null
  >(null);
  const [isCreateAdministrationTermDialogOpen, setCreateAdministrationTermDialogOpen] = useState(false);
  const administrationTerms = useMemo(() => queryState.data?.administration.listAdministrationTerms, [queryState.data]);
  const hasNoAdministrationTerms = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (administrationTerms?.totalCount ?? 0) === 0,
    [administrationTerms, variables],
  );

  const [administrationQueryState] = useGetAdministrationQuery({
    variables: { administrationId: Number(id) },
  });
  const administration = useMemo(
    () =>
      administrationQueryState.data?.administration.get
        ? parseAdministrationToAdministrationFormInput(administrationQueryState.data.administration.get)
        : undefined,
    [administrationQueryState],
  );

  useEffect(() => {
    if (administrationTerms?.totalCount !== undefined) {
      onChange(administrationTerms.totalCount);
    }
  }, [administrationTerms?.totalCount, onChange]);

  const handleOpenCreateAdministrationTermDialog = useCallback(() => {
    setCreateAdministrationTermDialogOpen(true);
  }, []);
  const handleCloseCreateAdministrationTermDialog = useCallback(() => {
    setCreateAdministrationTermDialogOpen(false);
  }, []);
  const handleSaveCreateAdministrationTerm = useCallback(
    async (administrationTerm: AdministrationTermFormInput) => {
      setLoading(true);
      const result = await createAdministrationTerm({
        administrationId: Number(id),
        input: parseAdministrationTermFormInputToAdministrationTermInput(administrationTerm),
      });
      setLoading(false);
      if (result.data?.administrationTerm.add.isSuccess) {
        showSnackbar(t('administration_term.feedback.create'), 'success');
        handleCloseCreateAdministrationTermDialog();
        reexecuteQuery();
      } else {
        showError(result.data?.administrationTerm.add.validationErrors);
      }
    },
    [
      createAdministrationTerm,
      id,
      showSnackbar,
      t,
      handleCloseCreateAdministrationTermDialog,
      reexecuteQuery,
      showError,
    ],
  );

  const showAllButton = useCallback(
    (row: AdministrationTermFragment) => {
      const onClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        setAdministrationTermInstallmentsDialogProps(
          row.installments.map(parseAdministrationTermInstallmentToAdministrationTermInstallmentFormInput),
        );
      };

      return (
        <Typography variant="link" onClick={onClick}>
          {t('administration_term.action.show_all')}
        </Typography>
      );
    },
    [t],
  );
  const handleCloseAdministrationTermInstallmentsDialog = useCallback(() => {
    setAdministrationTermInstallmentsDialogProps(null);
  }, []);

  const handleNavigationToTerm = useCallback(
    (administrationTermId: number, readonly: boolean = true) => {
      navigate(`/app/asset-management/administrations/${id}/terms/${administrationTermId}`, {
        state: { readonly },
      });
    },
    [id, navigate],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoAdministrationTerms ? (
        <SectionTitle sx={{ justifyContent: 'center' }} value="administration_term.text.no_administration_terms" />
      ) : (
        <PrimaryTable
          color="secondary"
          columns={getAdministrationTermsColumns(t, showAllButton)}
          customRowActions={
            canRead
              ? [
                  {
                    context: 'row',
                    icon: FileOpenOutlined,
                    id: 'view',
                    label: 'core.button.detail',
                    onClick: (row: AdministrationTermFragment) => {
                      handleNavigationToTerm(row.id);
                    },
                  },
                ]
              : undefined
          }
          empty={`administration_term.text.no_administration_terms`}
          initialState={initialState}
          rows={administrationTerms?.nodes ?? []}
          totalCount={administrationTerms?.totalCount ?? 0}
          useRowSelection={!readonly}
          getRowId={({ id }) => String(id)}
          rowActionsVariant="inline"
          onAdd={
            readonly || !canCreate
              ? undefined
              : {
                  color: 'secondary',
                  icon: <AddCircleOutline />,
                  label: 'administration_term.action.add_administration_term',
                  onClick: handleOpenCreateAdministrationTermDialog,
                }
          }
          onFilter={handleFilter()}
          onPageChange={handlePageChange(administrationTerms?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          useColumnVisibility={false}
          onView={
            !canRead
              ? undefined
              : (row) => {
                  handleNavigationToTerm(row.id);
                }
          }
          onEdit={
            readonly || !canUpdate
              ? undefined
              : (row) => {
                  handleNavigationToTerm(row.id, false);
                }
          }
          onDelete={
            readonly || !canDelete
              ? undefined
              : handleDelete('administration_term', DeleteAdministrationTermsDocument, reexecuteQuery)
          }
        />
      )}
      {administrationTermInstallmentsDialogProps && (
        <AdministrationTermTableInstallmentsDialog
          installments={administrationTermInstallmentsDialogProps}
          onClose={handleCloseAdministrationTermInstallmentsDialog}
        />
      )}
      {isCreateAdministrationTermDialogOpen && (
        <AdministrationTermCreateDialog
          administration={administration}
          existingAdministrationTerms={administrationTerms?.nodes ?? []}
          onClose={handleCloseCreateAdministrationTermDialog}
          onSave={handleSaveCreateAdministrationTerm}
        />
      )}
    </>
  );
};
