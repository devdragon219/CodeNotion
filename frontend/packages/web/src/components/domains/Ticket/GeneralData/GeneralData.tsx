import { Grid2 } from '@mui/material';
import {
  CheckboxField,
  DateField,
  SectionTitle,
  SelectField,
  TextField,
  TimeField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useMemo } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SORTED_PRIORITIES } from '../../../../configs/priority';
import { ALLOWED_SUPPLIER_TICKET_MASTER_STATUSES, SORTED_TICKET_MASTER_STATUSES } from '../../../../configs/ticket';
import { WorkTeamFieldValue } from '../../../../interfaces/FieldValues/WorkTeam';
import {
  CatalogueCategoryFormInput,
  CatalogueSubCategoryFormInput,
} from '../../../../interfaces/FormInputs/CatalogueCategory';
import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { WorkersFieldValues } from '../../../../interfaces/FormInputs/Worker';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { parseFloorToFloorFormInput } from '../../../../utils/components/floorField/parseFloorFragment';
import { CatalogueCategoryField } from '../../../core/Fields/CatalogueCategory/CatalogueCategory';
import { CatalogueItemField } from '../../../core/Fields/CatalogueItem/CatalogueItem';
import { CatalogueSubCategoryField } from '../../../core/Fields/CatalogueSubCategory/CatalogueSubCategory';
import { CatalogueTypeField } from '../../../core/Fields/CatalogueType/CatalogueType';
import { TicketTypeField } from '../../../core/Fields/TicketType/TicketType';
import { UserField } from '../../../core/Fields/User/User';
import { WorkTeamField } from '../../../core/Fields/WorkTeam/WorkTeam';
import { Workers } from '../../Worker/Workers';
import { TicketGeneralDataProps } from './GeneralData.types';
import { SupplierSubjectField } from './SupplierSubject/SupplierSubject';

export const TicketGeneralData = ({
  control,
  errors,
  isSupplier,
  mode,
  readonly,
  setValue,
}: TicketGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const mainType = useWatch({ control, name: 'mainType' });
  const status = useWatch({ control, name: 'masterStatus' });
  const estateUnit = useWatch({ control, name: 'locationEstateUnit' });
  const floors = useMemo(() => estateUnit?.floors.map(parseFloorToFloorFormInput) ?? [], [estateUnit?.floors]);
  const category = useWatch({ control, name: 'catalogueCategory' });
  const subCategory = useWatch({ control, name: 'catalogueSubCategory' });
  const type = useWatch({ control, name: 'catalogueType' });
  const items = useWatch({ control, name: 'catalogueItems' });
  const supplierSubject = useWatch({ control, name: 'supplierSubject' });

  const isTicket = useMemo(() => [TicketMainType.Issue, TicketMainType.IssueParent].includes(mainType), [mainType]);

  const handleCategoryChange = useCallback(
    (onChange: (value: CatalogueCategoryFormInput | null) => void) => (value: CatalogueCategoryFormInput | null) => {
      onChange(value);

      setValue('catalogueSubCategory', null);
      setValue('catalogueType', null);
      setValue('catalogueItems', []);
    },
    [setValue],
  );

  const handleSubCategoryChange = useCallback(
    (onChange: (value: CatalogueSubCategoryFormInput | null) => void) =>
      (value: CatalogueSubCategoryFormInput | null) => {
        onChange(value);

        setValue('catalogueType', null);
        setValue('catalogueItems', []);
      },
    [setValue],
  );

  const handleTypeChange = useCallback(
    (onChange: (value: CatalogueTypeFormInput | null) => void) => (value: CatalogueTypeFormInput | null) => {
      onChange(value);

      setValue('catalogueItems', []);
    },
    [setValue],
  );

  const handlePlannedTeamChange = useCallback(
    (onChange: (value: WorkTeamFieldValue | null) => void) => (value: WorkTeamFieldValue | null) => {
      onChange(value);

      setValue('plannedTeamLeaderUser', value?.leaderUser ?? null);
      setValue(
        'workers',
        value?.workers.map((worker) => ({
          ...worker,
          workerId: null,
        })) ?? [],
      );
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="ticket.section_title.estate_unit" />
      {(mode === FormMode.Edit || !isTicket) && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="locationEstateUnit.internalCode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('ticket.field.estate_unit_code')} readonly={readonly} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="locationEstateUnit.name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('ticket.field.estate_unit_name')} readonly={readonly} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="locationEstateUnit.address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.estate_unit_address')}
                  value={parseAddressToString(field.value, language)}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
        </>
      )}
      {isTicket && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="locationFloor"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('ticket.field.location_floor')}
                  options={floors}
                  getOptionKey={(option) => `${option.floorId}`}
                  getOptionLabel={(option) => `(${option.position}) ${option.name}`}
                  error={!!errors.locationFloor}
                  helperText={errors.locationFloor?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="locationSector"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.location_sector')}
                  error={!!errors.locationSector}
                  helperText={errors.locationSector?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="locationRoom"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.location_room')}
                  error={!!errors.locationRoom}
                  helperText={errors.locationRoom?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
        </>
      )}
      <SectionTitle value="ticket.section_title.general_data" />
      {!isTicket && (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="ticketChecklist.internalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.ticket_checklist_code')}
                  readonly={readonly}
                  disabled
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="ticketChecklist.name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.ticket_checklist_name')}
                  readonly={readonly}
                  disabled
                  required
                />
              )}
            />
          </Grid2>
        </>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create || !isTicket ? 6 : 3 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t(`ticket.field.${isTicket ? 'issue' : 'on_condition'}_ticket_code`)}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              disabled={!isTicket || isSupplier || status !== TicketMasterStatus.New}
              required
            />
          )}
        />
      </Grid2>
      {(mode === FormMode.Edit || !isTicket) && (
        <>
          {isTicket && (
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Controller
                name="workOrderReference"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('ticket.field.work_order_reference')}
                    error={!!errors.workOrderReference}
                    helperText={errors.workOrderReference?.message}
                    readonly={readonly}
                    disabled={isSupplier || status !== TicketMasterStatus.New}
                  />
                )}
              />
            </Grid2>
          )}
          {(mode === FormMode.Edit || !isTicket) && (
            <Grid2 size={{ xs: 12, sm: isTicket ? 3 : 6 }}>
              <Controller
                name="masterStatus"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    options={SORTED_TICKET_MASTER_STATUSES.map((status) => ({
                      disabled: isSupplier
                        ? !ALLOWED_SUPPLIER_TICKET_MASTER_STATUSES.includes(status)
                        : ALLOWED_SUPPLIER_TICKET_MASTER_STATUSES.includes(status),
                      label: t(`common.enum.ticket_master_status.${status}`),
                      value: status,
                    }))}
                    useSortedOptions={false}
                    getOptionLabel={(option) => t(`common.enum.ticket_master_status.${option}`)}
                    label={t(`ticket.field.${isTicket ? 'issue' : 'on_condition'}_ticket_status`)}
                    error={!!errors.masterStatus}
                    helperText={errors.masterStatus?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
          )}
        </>
      )}
      {isTicket ? (
        <>
          <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 3 }}>
            <Controller
              name="isWorkSafetyExpected"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('ticket.field.work_safety_expected')}
                  error={!!errors.isWorkSafetyExpected}
                  helperText={errors.isWorkSafetyExpected?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="requestor"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.requestor')}
                  error={!!errors.requestor}
                  helperText={errors.requestor?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="requestorContactEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.requestor_email')}
                  error={!!errors.requestorContactEmail}
                  helperText={errors.requestorContactEmail?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="requestorContactPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.requestor_phone')}
                  error={!!errors.requestorContactPhone}
                  helperText={errors.requestorContactPhone?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="requestDateTime"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('ticket.field.request_date')}
                  error={!!errors.requestDateTime}
                  helperText={errors.requestDateTime?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="requestDateTime"
              control={control}
              render={({ field }) => (
                <TimeField
                  {...field}
                  label={t('ticket.field.request_time')}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('ticket.field.due_date')}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isExcludedFromMaintenanceContract"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('ticket.field.excluded_from_contract')}
                  error={!!errors.isExcludedFromMaintenanceContract}
                  helperText={errors.isExcludedFromMaintenanceContract?.message}
                  readonly={readonly}
                  disabled={mode === FormMode.Edit}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="customType"
              control={control}
              render={({ field }) => (
                <TicketTypeField
                  {...field}
                  label={t('ticket.field.ticket_type')}
                  error={!!errors.customType}
                  helperText={errors.customType?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  options={SORTED_PRIORITIES}
                  useSortedOptions={false}
                  getOptionLabel={(option) => t(`common.enum.priority.${option}`)}
                  label={t('ticket.field.priority')}
                  error={!!errors.priority}
                  helperText={errors.priority?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                  required
                />
              )}
            />
          </Grid2>
          <SectionTitle value="ticket.section_title.ticket_details" />
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="facilityContract.internalCode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('ticket.field.contract_code')} readonly={readonly} disabled required />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <SupplierSubjectField control={control} errors={errors} disabled readonly={readonly} setValue={setValue} />
          </Grid2>
        </>
      )}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="catalogueCategory"
          control={control}
          render={({ field }) => (
            <CatalogueCategoryField
              {...field}
              onChange={handleCategoryChange(field.onChange)}
              label={t('ticket.field.catalogue_category')}
              error={!!errors.catalogueCategory}
              helperText={errors.catalogueCategory?.message}
              readonly={readonly}
              disabled={!isTicket || isSupplier || status !== TicketMasterStatus.New}
              required
              where={{
                catalogueTypes: {
                  some: {
                    items: {
                      some: {
                        estate: {
                          id: {
                            eq: estateUnit?.estate.id,
                          },
                        },
                      },
                    },
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="catalogueSubCategory"
          control={control}
          render={({ field }) => (
            <CatalogueSubCategoryField
              {...field}
              onChange={handleSubCategoryChange(field.onChange)}
              label={t('ticket.field.catalogue_subcategory')}
              catalogueCategoryId={category?.categoryId}
              error={!!errors.catalogueSubCategory}
              helperText={errors.catalogueSubCategory?.message}
              disabled={
                !isTicket ||
                isSupplier ||
                status !== TicketMasterStatus.New ||
                !category ||
                category.subCategories.length === 0
              }
              readonly={readonly}
              required
              where={{
                catalogueTypes: {
                  some: {
                    items: {
                      some: {
                        estate: {
                          id: {
                            eq: estateUnit?.estate.id,
                          },
                        },
                      },
                    },
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="catalogueType"
          control={control}
          render={({ field }) => (
            <CatalogueTypeField
              {...field}
              onChange={handleTypeChange(field.onChange)}
              label={t('ticket.field.catalogue_type')}
              error={!!errors.catalogueType}
              helperText={errors.catalogueType?.message}
              disabled={
                !isTicket ||
                isSupplier ||
                status !== TicketMasterStatus.New ||
                !category ||
                category.catalogueTypes.length === 0 ||
                !subCategory
              }
              readonly={readonly}
              required
              where={{
                category: {
                  id: {
                    eq: category?.categoryId,
                  },
                },
                subCategory: {
                  id: {
                    eq: subCategory?.subCategoryId,
                  },
                },
                items: {
                  some: {
                    estate: {
                      id: {
                        eq: estateUnit?.estate.id,
                      },
                    },
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="catalogueItems"
          control={control}
          render={({ field }) => (
            <CatalogueItemField
              {...field}
              multiple
              label={t('ticket.field.catalogue_items')}
              error={!!errors.catalogueItems}
              helperText={errors.catalogueItems?.message}
              disabled={!isTicket || isSupplier || status !== TicketMasterStatus.New || !type}
              readonly={readonly}
              required
              where={{
                catalogueType: {
                  id: {
                    eq: type?.catalogueTypeId,
                  },
                },
                estate: {
                  id: {
                    eq: estateUnit?.estate.id,
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
      {isTicket ? (
        <>
          <Grid2 size={12}>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('ticket.field.summary')}
                  error={!!errors.summary}
                  helperText={errors.summary?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label={t('ticket.field.description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                />
              )}
            />
          </Grid2>
          <SectionTitle value="ticket.section_title.supplier_subjects" />
          <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 12 : 4 }}>
            <SupplierSubjectField
              control={control}
              errors={errors}
              disabled={isSupplier || status !== TicketMasterStatus.New || items.length === 0}
              readonly={readonly}
              setValue={setValue}
            />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="mainType"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  options={Object.values(TicketMainType)}
                  getOptionLabel={(option) => t(`common.enum.ticket_main_type.${option}`)}
                  label={t('ticket.field.main_type')}
                  error={!!errors.mainType}
                  helperText={errors.mainType?.message}
                  readonly={readonly}
                  disabled
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('ticket.field.checklist_due_date')}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                  readonly={readonly}
                  disabled={isSupplier || status !== TicketMasterStatus.New}
                  required
                />
              )}
            />
          </Grid2>
        </>
      )}
      {(mode === FormMode.Edit || !isTicket) && (
        <>
          <Grid2 size={{ xs: 12, sm: isTicket ? 4 : 6 }}>
            <Controller
              name="plannedTeam"
              control={control}
              render={({ field }) => (
                <WorkTeamField
                  {...field}
                  onChange={handlePlannedTeamChange(field.onChange)}
                  label={t('ticket.field.work_team')}
                  error={!!errors.supplierSubject}
                  helperText={errors.supplierSubject?.message}
                  readonly={readonly}
                  disabled={!isSupplier || status !== TicketMasterStatus.Assigned}
                  required={isSupplier}
                  where={{
                    providerSubjectId: {
                      eq: supplierSubject?.id,
                    },
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: isTicket ? 4 : 6 }}>
            <Controller
              name="plannedTeamLeaderUser"
              control={control}
              render={({ field }) => (
                <UserField
                  {...field}
                  label={t('ticket.field.leader_user')}
                  error={!!errors.plannedTeamLeaderUser}
                  helperText={errors.plannedTeamLeaderUser?.message}
                  disabled={!isSupplier || status !== TicketMasterStatus.Assigned || !supplierSubject}
                  readonly={readonly}
                  required={isSupplier}
                  where={{
                    supplierSubjectId: {
                      eq: supplierSubject?.id,
                    },
                  }}
                />
              )}
            />
          </Grid2>
        </>
      )}
      {!isTicket && (
        <Grid2 size={12}>
          <Workers
            control={control as unknown as Control<WorkersFieldValues>}
            errors={errors}
            readonly={readonly || !isSupplier || status !== TicketMasterStatus.Resolved}
            mode={FormMode.Edit}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
