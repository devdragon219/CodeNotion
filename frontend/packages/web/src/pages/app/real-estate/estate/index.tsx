import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { BlockerDialog, CardActions, Form, Loader, Tabs } from '@realgimm5/frontend-common/components';
import { TableProvider, useOperation, useSnackbar } from '@realgimm5/frontend-common/contexts';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useDebounce, useNavigateBack, useTabsLocation } from '@realgimm5/frontend-common/hooks';
import { StateLocation } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { OperationResult, useClient } from 'urql';

import { FloorTemplateDialog } from '../../../../components/dialogs/FloorTemplate/FloorTemplate';
import { FloorTemplateDialogInput } from '../../../../components/dialogs/FloorTemplate/FloorTemplate.types';
import { EstateAddresses } from '../../../../components/domains/Estate/Addresses/Addresses';
import { EstateDocuments } from '../../../../components/domains/Estate/Documents/Documents';
import { EstateGeneralData } from '../../../../components/domains/Estate/GeneralData/GeneralData';
import { EstateRecap } from '../../../../components/domains/Estate/Recap/Recap';
import { EstateRefactorings } from '../../../../components/domains/Estate/Refactorings/Refactorings';
import { EstateSurfaces } from '../../../../components/domains/Estate/Surfaces/Surfaces';
import { EstateValues } from '../../../../components/domains/Estate/Values/Values';
import { CataloguesTable } from '../../../../components/tables/Catalogues/Catalogues';
import { EstateUnitsTable } from '../../../../components/tables/EstateUnits/EstateUnits';
import { RawFeature } from '../../../../enums/RawFeature';
import { EstateFragment } from '../../../../gql/RealGimm.Web.Estate.fragment';
import {
  DeleteEstateDocument,
  ExportEstatesDocument,
  GetEstateDocument,
  GetEstateQuery,
  useUpdateEstateMutation,
} from '../../../../gql/RealGimm.Web.Estate.operation';
import { FloorTemplateFragment } from '../../../../gql/RealGimm.Web.FloorTemplate.fragment';
import { useAddFloorTemplatesMutation } from '../../../../gql/RealGimm.Web.FloorTemplate.operation';
import { useEstate } from '../../../../hooks/useEstate';
import { useFeature } from '../../../../hooks/useFeature';
import { EstateFormInput } from '../../../../interfaces/FormInputs/Estate';
import { FloorFormInput, FloorTemplateFormInput } from '../../../../interfaces/FormInputs/Floor';
import { getAddressesSchema } from '../../../../utils/components/addressesField/schemas/addresses';
import { parseEstateFormInputToEstateInput } from '../../../../utils/estate/parseEstateFormInput';
import { parseEstateToEstateFormInput } from '../../../../utils/estate/parseEstateFragment';
import { getEstateAssetValuesSchema } from '../../../../utils/estate/schemas/assetValues';
import { getEstateDocumentsAndImagesSchema } from '../../../../utils/estate/schemas/documents';
import { getEstateSchema } from '../../../../utils/estate/schemas/estate';
import { getEstateGeneralDataSchema } from '../../../../utils/estate/schemas/generalData';
import { getEstateRefactoringsSchema } from '../../../../utils/estate/schemas/refactoring';
import { getEstateTotalMarketValueSchema } from '../../../../utils/estate/schemas/totalMarketValue';
import { parseFloorTemplateFormInputToFloorTemplateInput } from '../../../../utils/floorTemplate/parseFloorTemplateFormInput';

export default function Estate() {
  const { canDelete, canRead, canUpdate } = useFeature(RawFeature.ASST_ESTATE_BASE);
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { id } = useParams();
  const { handleDelete, handleExport } = useOperation();
  const { state } = useLocation() as StateLocation;
  const { showError, showSnackbar } = useSnackbar();
  const tabsLocation = useTabsLocation();
  const client = useClient();
  const goBack = useNavigateBack('/app/real-estate/estates');
  const { checkCanUseInternalCode } = useEstate();
  const [loading, setLoading] = useState(false);
  const [readonly, setReadonly] = useState(state?.readonly ?? true);
  const [, addFloorTemplatesMutation] = useAddFloorTemplatesMutation();
  const [addFloorTemplateDialogProps, setFloorTemplateDialogProps] = useState<{
    open: boolean;
    onComplete?: () => void;
  }>({
    open: false,
  });
  const [, updateEstateMutation] = useUpdateEstateMutation();
  const [estate, setEstate] = useState<EstateFormInput>();
  const [estateFragment, setEstateFragment] = useState<EstateFragment>();
  const debouncedEstate = useDebounce(estate);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const [initialFloors, setInitialFloors] = useState<FloorFormInput[]>([]);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);

  const fetchEstate = useCallback(async () => {
    setLoading(true);
    const result: OperationResult<GetEstateQuery> = await client.query(GetEstateDocument, {
      estateId: Number(id),
    });
    setLoading(false);
    if (!result.data?.estate.estate) return Promise.reject();
    setEstateFragment(result.data.estate.estate);
    const estate = parseEstateToEstateFormInput(result.data.estate.estate);
    setInitialFloors(estate.floors);
    return estate;
  }, [id, client]);

  const {
    control,
    formState: { isValid: canSave, errors, isSubmitted },
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<EstateFormInput>({
    defaultValues: fetchEstate,
    resolver: estate ? yupResolver(getEstateSchema(canUseInternalCode, language, t)) : undefined,
  });

  useEffect(() => {
    if (debouncedEstate) {
      checkCanUseInternalCode(debouncedEstate.internalCode, debouncedEstate.estateId, setCanUseInternalCode);
    }
    // eslint-disable-next-line
  }, [debouncedEstate?.internalCode, debouncedEstate?.estateId]);

  useEffect(() => {
    window.history.replaceState(null, document.title);
    const { unsubscribe } = watch((formValues) => {
      setEstate(formValues as EstateFormInput);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(estate);
      setSubmitSuccessful(false);
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const setFloors = useCallback(
    (floorTemplates: FloorTemplateFragment[]) => {
      const floors = [
        ...(estate?.floors ?? []),
        ...floorTemplates.map<FloorFormInput>(({ guid, name, position }) => ({
          floorId: null,
          guid,
          name,
          position,
        })),
      ];
      setValue('floors', floors);
    },
    [estate?.floors, setValue],
  );

  const openAddFloorTemplateDialog = useCallback((onComplete: () => void) => {
    setFloorTemplateDialogProps({
      open: true,
      onComplete,
    });
  }, []);
  const closeAddFloorTemplateDialog = useCallback(() => {
    setFloorTemplateDialogProps({
      open: false,
    });
  }, []);
  const handleSaveFloorTemplate = useCallback(
    async (value: FloorTemplateFormInput[] | FloorTemplateDialogInput) => {
      if (Array.isArray(value) && value.length > 0) {
        setLoading(true);
        const result = await addFloorTemplatesMutation({
          input: value.map(parseFloorTemplateFormInputToFloorTemplateInput),
        });
        setLoading(false);
        if (result.data?.floorTemplate.addFloorTemplates.isSuccess) {
          const floorTemplates = (result.data.floorTemplate.addFloorTemplates.value ?? []) as FloorTemplateFragment[];
          showSnackbar(t(`floor.feedback.create.${value.length === 1 ? 'single' : 'multiple'}`), 'success');
          setFloors(floorTemplates);
          addFloorTemplateDialogProps.onComplete?.();
          closeAddFloorTemplateDialog();
        } else {
          showError(result.data?.floorTemplate.addFloorTemplates.validationErrors);
        }
      } else {
        closeAddFloorTemplateDialog();
      }
    },
    [
      addFloorTemplatesMutation,
      showSnackbar,
      t,
      setFloors,
      addFloorTemplateDialogProps,
      closeAddFloorTemplateDialog,
      showError,
    ],
  );

  const handleCancel = useCallback(() => {
    reset();
    setReadonly(true);
  }, [reset]);
  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const onSubmit = useCallback(
    async (estate: EstateFormInput) => {
      setLoading(true);
      const result = await updateEstateMutation({
        estateId: Number(estate.estateId),
        estateInput: parseEstateFormInputToEstateInput(estate),
      });
      setLoading(false);
      if (result.data?.estate.updateEstate.isSuccess) {
        showSnackbar(t('estate.feedback.update'), 'success');
        setReadonly(true);
        const updatedEstate = await fetchEstate();
        setEstate(updatedEstate);
        setInitialFloors(updatedEstate.floors);
        setSubmitSuccessful(true);
        return Promise.resolve();
      } else {
        showError(result.data?.estate.updateEstate.validationErrors);
      }
      return Promise.reject();
    },
    [updateEstateMutation, showSnackbar, t, fetchEstate, showError],
  );

  const title = useMemo(
    () => (estate ? `${estate.internalCode}${estate.name.length ? ` - ${estate.name}` : ''}` : ''),
    [estate],
  );

  const handleWorkingClose = useCallback(() => {
    const values = getValues();
    return onSubmit(values);
  }, [onSubmit, getValues]);

  const onDelete = useCallback(() => {
    setReadonly(true);
    goBack();
  }, [goBack]);

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loader />}
      {addFloorTemplateDialogProps.open && (
        <FloorTemplateDialog onClose={closeAddFloorTemplateDialog} onSave={handleSaveFloorTemplate} />
      )}
      <Card>
        <Box sx={{ px: 1, pt: 2 }}>
          <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
            {t('common.button.back')}
          </Button>
        </Box>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: 'h2' }}
          action={
            <CardActions
              readonly={readonly}
              onCancel={handleCancel}
              onDelete={canDelete ? handleDelete('estate', DeleteEstateDocument, onDelete) : undefined}
              onEdit={canUpdate ? handleEdit : undefined}
              onExport={canRead ? handleExport(ExportEstatesDocument) : undefined}
            />
          }
        />
        <CardContent>
          <Tabs
            {...tabsLocation}
            tabs={[
              {
                label: 'estate.tab.recap',
                children: estate && <EstateRecap control={control} errors={errors} />,
              },
              {
                label: 'estate.tab.general_data',
                children: estate && (
                  <EstateGeneralData
                    control={control}
                    errors={errors}
                    initialFloors={initialFloors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    onAddFloor={openAddFloorTemplateDialog}
                    setValue={setValue}
                  />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  estate &&
                  !getEstateGeneralDataSchema(canUseInternalCode, t).isValidSync(estate),
              },
              {
                label: 'estate.tab.addresses',
                children: estate && (
                  <EstateAddresses
                    control={control}
                    errors={errors}
                    mode={FormMode.Edit}
                    readonly={readonly}
                    setValue={setValue}
                  />
                ),
                error: !readonly && isSubmitted && estate && !getAddressesSchema(true, t).isValidSync(estate),
              },
              {
                label: 'estate.tab.surfaces',
                children: estate && <EstateSurfaces control={control} readonly={readonly} />,
              },
              {
                label: 'estate.tab.estate_values',
                children: estate && <EstateValues control={control} readonly={readonly} setValue={setValue} />,
                error:
                  !readonly &&
                  isSubmitted &&
                  estate &&
                  !getEstateAssetValuesSchema(t).concat(getEstateTotalMarketValueSchema(t)).isValidSync(estate),
              },
              {
                label: 'estate.tab.estate_units',
                children: estate && (
                  <TableProvider
                    key="estate-units"
                    initialState={{
                      sorting: [
                        {
                          desc: false,
                          id: 'internalCode',
                        },
                      ],
                    }}
                  >
                    <EstateUnitsTable estate={estateFragment} readonly={!readonly} />
                  </TableProvider>
                ),
              },
              {
                label: 'estate.tab.catalogues',
                children: estate && (
                  <TableProvider
                    key="catalogues"
                    initialState={{
                      sorting: [
                        {
                          desc: false,
                          id: 'catalogueCategory',
                        },
                      ],
                    }}
                  >
                    <CataloguesTable estate={estateFragment} readonly={!readonly} />
                  </TableProvider>
                ),
              },
              {
                label: 'estate.tab.refactorings',
                children: estate && <EstateRefactorings control={control} readonly={readonly} />,
                error: !readonly && isSubmitted && estate && !getEstateRefactoringsSchema(t).isValidSync(estate),
              },
              {
                label: 'estate.tab.documents',
                children: estate && (
                  <EstateDocuments control={control} errors={errors} mode={FormMode.Edit} readonly={readonly} />
                ),
                error:
                  !readonly &&
                  isSubmitted &&
                  estate &&
                  !getEstateDocumentsAndImagesSchema(language, t).isValidSync(estate),
              },
            ]}
          />
        </CardContent>
      </Card>
      <BlockerDialog isBlocked={!readonly} canSave={canSave} onSave={handleWorkingClose} />
    </Form>
  );
}
