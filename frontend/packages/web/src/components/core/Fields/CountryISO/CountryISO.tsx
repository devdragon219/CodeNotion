import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { getCountryName, getSortedCountryCodes } from '../../../../utils/countryUtils';
import { CountryISOFieldProps } from './CountryISO.types';

const CountryISOField = forwardRef<HTMLDivElement, CountryISOFieldProps>((props, ref) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <AutocompleteField
      {...props}
      ref={ref}
      options={getSortedCountryCodes(language)}
      getOptionLabel={(countryCode) => getCountryName(countryCode, language)}
    />
  );
});
CountryISOField.displayName = 'CountryISOField';

export { CountryISOField };
