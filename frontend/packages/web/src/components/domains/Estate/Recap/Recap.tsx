import { Box, Grid2, Theme, useMediaQuery } from '@mui/material';
import { Loader, MapField, QRCode, SelectField, Slider, TextField } from '@realgimm5/frontend-common/components';
import {
  AsstAddressType,
  EstateOwnership,
  EstateStatus,
  EstateType,
  PersonType,
} from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useMapView } from '@realgimm5/frontend-common/hooks';
import { getDocumentDownloadUrl } from '@realgimm5/frontend-common/utils';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetEstateImagesQuery } from '../../../../gql/RealGimm.Web.Estate.operation';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { SubjectField } from '../../../core/Fields/Subject/Subject';
import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { EstateRecapProps } from './Recap.types';

export const EstateRecap = ({ control, errors }: EstateRecapProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const isColumnLayout = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const estateId = useWatch({ control, name: 'estateId' })!;
  const [queryData] = useGetEstateImagesQuery({ variables: { estateId } });

  const addresses = useWatch({ control, name: 'addresses' });
  const primaryAddressIndex = useMemo(
    () => addresses.findIndex((address) => address.addressType === AsstAddressType.Primary),
    [addresses],
  );
  const countryISO = useWatch({ control, name: `addresses.${primaryAddressIndex}.countryISO` });
  const cityName = useWatch({ control, name: `addresses.${primaryAddressIndex}.city.name` });
  const toponymy = useWatch({ control, name: `addresses.${primaryAddressIndex}.toponymy` });
  const numbering = useWatch({ control, name: `addresses.${primaryAddressIndex}.numbering` });
  const coordinates = useWatch({ control, name: `addresses.${primaryAddressIndex}.coordinates` });

  const debouncedCountryISO = useDebounce(countryISO);
  const debouncedCityName = useDebounce(cityName);
  const debouncedToponymy = useDebounce(toponymy);
  const debouncedNumbering = useDebounce(numbering);

  const { mapView } = useMapView(
    debouncedCountryISO,
    debouncedCityName,
    debouncedToponymy,
    debouncedNumbering,
    coordinates,
  );

  const images = useMemo(
    () =>
      (queryData.data?.estate.estate?.images ?? []).reduce<string[]>((acc, image) => {
        const url = getDocumentDownloadUrl(image.cmisId, image.entityId);
        if (url) return [...acc, url];
        return acc;
      }, []),
    [queryData.data],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {queryData.fetching && <Loader />}
      {images.length > 0 && (
        <Grid2 size={12}>
          <Slider images={images} />
        </Grid2>
      )}
      <Grid2 size={12}>
        <MapField mapView={mapView} disabled />
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ display: 'flex', flexDirection: isColumnLayout ? 'column' : 'row', mt: { xs: 2, sm: 3 }, gap: 3 }}>
          <Grid2 sx={{ flex: 1 }} container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="internalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('estate.field.estate_code')}
                    error={!!errors.internalCode}
                    helperText={errors.internalCode?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="externalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('estate.field.external_estate_code')}
                    error={!!errors.externalCode}
                    helperText={errors.externalCode?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('estate.field.estate_name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="addresses"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('estate.field.address_toponymy')}
                    value={parseAddressToString(
                      field.value.find((address) => address.addressType === AsstAddressType.Primary),
                      language,
                    )}
                    error={!!errors.addresses}
                    helperText={errors.addresses?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={t('estate.field.estate_status')}
                    options={Object.values(EstateStatus)}
                    getOptionLabel={(option) => t(`common.enum.estate_status.${option}`)}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="estateType"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={t('estate.field.estate_type')}
                    options={Object.values(EstateType)}
                    getOptionLabel={(option) => t(`common.enum.estate_type.${option}`)}
                    error={!!errors.estateType}
                    helperText={errors.estateType?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="usageType"
                control={control}
                render={({ field }) => (
                  <UsageTypeField
                    {...field}
                    label={t('component.estate_usage_type_field.label')}
                    error={!!errors.usageType}
                    helperText={errors.usageType?.message}
                    readonly
                    isFor="estate"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="ownership"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label={t('estate.field.ownership')}
                    options={Object.values(EstateOwnership)}
                    getOptionLabel={(option) => t(`common.enum.estate_ownership.${option}`)}
                    error={!!errors.ownership}
                    helperText={errors.ownership?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="managementSubject"
                control={control}
                render={({ field }) => (
                  <SubjectField
                    {...field}
                    label={t('estate.field.management_subject')}
                    error={!!errors.managementSubject}
                    helperText={errors.managementSubject?.message}
                    readonly
                    where={{
                      personType: {
                        eq: PersonType.ManagementSubject,
                      },
                    }}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="managementOrgUnit"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value?.name}
                    label={t('estate.field.management_org_unit')}
                    error={!!errors.managementOrgUnit}
                    helperText={errors.managementOrgUnit?.message}
                    readonly
                  />
                )}
              />
            </Grid2>
          </Grid2>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 4 }}>
            <QRCode value={window.location.href} title="estate.text.estate_qr_code" isDownloadable />
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};
