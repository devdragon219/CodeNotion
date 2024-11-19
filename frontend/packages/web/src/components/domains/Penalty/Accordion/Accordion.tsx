import { AddCircleOutline } from '@mui/icons-material';
import { Accordion } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { usePenalty } from '../../../../hooks/usePenalty';
import { PenaltyField } from '../Field/Field';
import { PenaltyFieldAccordionProps } from './Accordion.types';

const PenaltyFieldAccordion = forwardRef<HTMLDivElement, PenaltyFieldAccordionProps>(
  (
    {
      contractInternalCode,
      penalties = [],
      value,
      index,
      internalCodes = [],
      onChange,
      onDuplicate,
      setCanUseInternalCodes,
      ...otherProps
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);
    const { checkCanUseInternalCode, getInternalCode } = usePenalty();
    const debouncedInternalCode = useDebounce(value.internalCode);
    const debouncedPenaltyId = useDebounce(value.penaltyId);
    const additionallyOccupiedCodes = useMemo(
      () => internalCodes.filter((internalCode, idx) => idx !== index && internalCode.length !== 0),
      [index, internalCodes],
    );
    const debouncedAdditionallyOccupiedCodes = useDebounce(additionallyOccupiedCodes);

    const handleDuplicate = useMemo(() => {
      if (!onDuplicate) return undefined;

      return () => {
        onDuplicate(value);
      };
    }, [onDuplicate, value]);

    useEffect(() => {
      if (value.internalCode === '') {
        getInternalCode(additionallyOccupiedCodes, contractInternalCode, (internalCode) => {
          onChange({
            ...value,
            internalCode,
          });
        });
      }
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (setCanUseInternalCodes) {
        checkCanUseInternalCode(
          debouncedInternalCode,
          debouncedPenaltyId,
          debouncedAdditionallyOccupiedCodes,
          (canUseInternalCode) => {
            setCanUseInternalCodes((canUseInternalCodes) => ({
              ...canUseInternalCodes,
              [value.guid]: canUseInternalCode,
            }));
          },
        );
      }
      // eslint-disable-next-line
    }, [debouncedInternalCode, debouncedPenaltyId, debouncedAdditionallyOccupiedCodes.length]);

    useEffect(() => {
      setExpanded(index === penalties.length - 1);
    }, [penalties.length, index]);

    return (
      <Accordion
        expanded={expanded}
        title={value.description}
        actions={
          handleDuplicate
            ? [
                {
                  icon: AddCircleOutline,
                  label: 'core.button.duplicate',
                  onClick: handleDuplicate,
                },
              ]
            : undefined
        }
      >
        <PenaltyField ref={ref} value={value} onChange={onChange} {...otherProps} />
      </Accordion>
    );
  },
);

PenaltyFieldAccordion.displayName = 'PenaltyFieldAccordion';
export { PenaltyFieldAccordion };
