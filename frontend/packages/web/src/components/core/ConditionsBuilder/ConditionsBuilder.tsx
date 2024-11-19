import { Box, Grid2 } from '@mui/material';
import { SectionTitle } from '@realgimm5/frontend-common/components';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { GroupConditionsFormInput } from '../../../interfaces/FormInputs/ConditionsBuilder';
import { getEmptyConditionsBuilderFormInput } from '../../../utils/components/conditionsBuilder/initialValues';
import { ConditionsBuilderProps } from './ConditionsBuilder.types';
import { GroupConditionsField } from './Fields/GroupConditions/GroupConditions';

const ConditionsBuilder = forwardRef<HTMLDivElement, ConditionsBuilderProps>(
  ({ conditionTypes, disabled, errors, readonly, value, onChange }, ref) => {
    const [fields, setFields] = useState(value ?? getEmptyConditionsBuilderFormInput());

    useEffect(() => {
      onChange?.(fields);
      // eslint-disable-next-line
    }, [fields]);

    const handleIfConditionChange = useCallback((ifCondition: GroupConditionsFormInput) => {
      setFields((fields) => ({
        ...fields,
        ifCondition,
      }));
    }, []);

    const handleThenConditionChange = useCallback((thenCondition: GroupConditionsFormInput) => {
      setFields((fields) => ({
        ...fields,
        thenCondition,
      }));
    }, []);

    return (
      <Box
        ref={ref}
        sx={(theme) => ({
          borderRadius: '4px',
          backgroundColor: theme.palette.grey[200],
          p: 3,
        })}
      >
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="component.conditions_builder.section_title.if" />
          <Grid2 size={12}>
            <GroupConditionsField
              conditionTypes={conditionTypes.if}
              disabled={disabled}
              errors={errors?.ifCondition}
              groupConditions={fields.ifCondition}
              readonly={readonly}
              onChange={handleIfConditionChange}
            />
          </Grid2>
          <SectionTitle value="component.conditions_builder.section_title.then" />
          <Grid2 size={12}>
            <GroupConditionsField
              conditionTypes={conditionTypes.then}
              disabled={disabled}
              errors={errors?.thenCondition}
              groupConditions={fields.thenCondition}
              readonly={readonly}
              onChange={handleThenConditionChange}
            />
          </Grid2>
        </Grid2>
      </Box>
    );
  },
);
ConditionsBuilder.displayName = 'ConditionsBuilder';

export { ConditionsBuilder };
