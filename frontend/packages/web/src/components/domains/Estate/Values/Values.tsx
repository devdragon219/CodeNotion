import { Grid2 } from '@mui/material';

import { AssetValuesField } from './AssetValuesField/AssetValuesField';
import { MarketValuesField } from './MarketValuesField/MarketValuesField';
import { EstateValuesProps } from './Values.types';

export const EstateValues = ({ control, readonly, setValue }: EstateValuesProps) => {
  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={12}>
        <MarketValuesField control={control} readonly={readonly} setValue={setValue} />
      </Grid2>
      <Grid2 size={12}>
        <AssetValuesField control={control} readonly={readonly} />
      </Grid2>
    </Grid2>
  );
};
