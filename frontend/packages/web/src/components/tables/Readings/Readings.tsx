import { Loader, PrimaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { MeteringType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RawFeature } from '../../../enums/RawFeature';
import { ReadingFragment } from '../../../gql/RealGimm.Web.Reading.fragment';
import {
  DeleteReadingsDocument,
  GetReadingsQueryVariables,
  useCreateReadingMutation,
  useGetReadingsQuery,
  useUpdateReadingMutation,
} from '../../../gql/RealGimm.Web.Reading.operation';
import { useFeature } from '../../../hooks/useFeature';
import { ReadingFormInput } from '../../../interfaces/FormInputs/Reading';
import { getReadingsColumns } from '../../../utils/reading/getReadingsColumns';
import { getReadingsFilterInput } from '../../../utils/reading/getReadingsFilterInput';
import { parseReadingFormInputToReadingInput } from '../../../utils/reading/parseReadingFormInput';
import { parseReadingToReadingFormInput } from '../../../utils/reading/parseReadingFragment';
import { ReadingDialog } from './Dialog/Dialog';
import { ReadingsTableProps } from './Readings.types';

export const ReadingsTable = ({ readonly, utilityService }: ReadingsTableProps) => {
  const { canCreate, canDelete, canUpdate, canRead } = useFeature(RawFeature.NRGY_SERVICE_BASE);
  const { t } = useTranslation();
  const { showError, showSnackbar } = useSnackbar();
  const { initialState, pause, variables, handleDelete, handleFilter, handlePageChange, handleSort, setInitialState } =
    useTable<GetReadingsQueryVariables>((variables) => ({
      ...variables,
      where: {
        ...(variables.where ?? {}),
        utilityService: {
          id: {
            eq: utilityService.utilityServiceId,
          },
        },
      },
    }));
  const [queryState, reexecuteQuery] = useGetReadingsQuery({ pause, variables });
  const [, createReadingMutation] = useCreateReadingMutation();
  const [, updateReadingMutation] = useUpdateReadingMutation();
  const [loading, setLoading] = useState(false);
  const [readingDialogProps, setReadingDialogProps] = useState<{
    reading?: ReadingFormInput;
    open: boolean;
  }>({
    open: false,
  });
  const readings = useMemo(() => queryState.data?.reading.listReadings, [queryState.data]);
  const hasNoReadings = useMemo(
    () => Object.keys(variables.where ?? {}).length === 0 && (readings?.totalCount ?? 0) === 0,
    [readings, variables],
  );
  const isReading = useMemo(
    () => MeteringType.IncrementalReading === utilityService.utilityType?.meteringType,
    [utilityService.utilityType?.meteringType],
  );

  const handleEdit = useCallback(
    (reading: ReadingFragment) => {
      setReadingDialogProps({
        reading: parseReadingToReadingFormInput(reading, Number(utilityService.utilityServiceId)),
        open: true,
      });
    },
    [utilityService.utilityServiceId],
  );

  const handleCreate = useCallback(() => {
    setReadingDialogProps({
      open: true,
    });
  }, []);

  const handleCloseReadingDialog = useCallback(() => {
    setReadingDialogProps({
      open: false,
    });
  }, []);

  const handleSaveReading = useCallback(
    async (reading: ReadingFormInput, mode: FormMode) => {
      const upsertReading = async () => {
        const readingInput = parseReadingFormInputToReadingInput(reading);
        switch (mode) {
          case FormMode.Create: {
            const result = await createReadingMutation({ readingInput });
            return result.data?.reading.add;
          }
          case FormMode.Edit: {
            const result = await updateReadingMutation({ readingId: Number(reading.readingId), readingInput });
            return result.data?.reading.update;
          }
        }
      };
      setLoading(true);
      const result = await upsertReading();
      setLoading(false);
      if (result?.isSuccess) {
        showSnackbar(t(`${isReading ? 'reading' : 'usage'}.feedback.create`), 'success');
        handleCloseReadingDialog();
        reexecuteQuery();
      } else {
        showError(result?.validationErrors);
      }
    },
    [
      createReadingMutation,
      updateReadingMutation,
      showSnackbar,
      t,
      isReading,
      handleCloseReadingDialog,
      reexecuteQuery,
      showError,
    ],
  );

  return (
    <>
      {(queryState.fetching || loading) && <Loader />}
      {readonly && hasNoReadings ? (
        <SectionTitle
          sx={{ justifyContent: 'center' }}
          value={isReading ? 'reading.section_title.no_readings' : 'usage.section_title.no_usages'}
        />
      ) : (
        <PrimaryTable
          color="secondary"
          columns={getReadingsColumns(isReading, utilityService, t)}
          empty={isReading ? 'reading.text.no_readings' : 'usage.text.no_usages'}
          initialState={initialState}
          rows={readings?.nodes ?? []}
          rowActionsVariant="inline"
          totalCount={readings?.totalCount ?? 0}
          useRowSelection={!readonly}
          getRowId={({ id }) => String(id)}
          onAdd={
            readonly || !canCreate
              ? undefined
              : {
                  color: 'secondary',
                  label: isReading ? 'reading.action.add_reading' : 'usage.action.add_usage',
                  onClick: handleCreate,
                }
          }
          onDelete={
            readonly || !canDelete
              ? undefined
              : handleDelete(isReading ? 'reading' : 'usage', DeleteReadingsDocument, reexecuteQuery)
          }
          onEdit={readonly || !canUpdate ? undefined : handleEdit}
          onFilter={handleFilter(getReadingsFilterInput)}
          onPageChange={handlePageChange(readings?.pageInfo)}
          onStateChange={setInitialState}
          onSort={handleSort()}
          onView={canRead ? handleEdit : undefined}
        />
      )}
      {readingDialogProps.open && (
        <ReadingDialog
          reading={readingDialogProps.reading}
          readonly={readonly}
          utilityService={utilityService}
          onClose={handleCloseReadingDialog}
          onSave={handleSaveReading}
        />
      )}
    </>
  );
};
