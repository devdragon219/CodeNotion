import { AddCircleOutline } from '@mui/icons-material';
import { Accordion } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useEffect, useMemo, useState } from 'react';

import { useSla } from '../../../../hooks/useSLA';
import { SlaField } from '../Field/Field';
import { SlaFieldAccordionProps } from './Accordion.types';

const SlaFieldAccordion = forwardRef<HTMLDivElement, SlaFieldAccordionProps>(
  (
    {
      contractInternalCode,
      slas = [],
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
    const { checkCanUseInternalCode, getInternalCode } = useSla();
    const debouncedInternalCode = useDebounce(value.internalCode);
    const debouncedSlaId = useDebounce(value.slaId);
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
          debouncedSlaId,
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
    }, [debouncedInternalCode, debouncedSlaId, debouncedAdditionallyOccupiedCodes.length]);

    useEffect(() => {
      setExpanded(index === slas.length - 1);
    }, [slas.length, index]);

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
        <SlaField ref={ref} value={value} onChange={onChange} {...otherProps} />
      </Accordion>
    );
  },
);
SlaFieldAccordion.displayName = 'SlaFieldAccordion';

export { SlaFieldAccordion };
