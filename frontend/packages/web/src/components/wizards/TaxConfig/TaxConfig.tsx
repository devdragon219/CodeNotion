import { CloseDialog, Dialog, Stepper, Tab } from '@realgimm5/frontend-common/components';
import { SubValueType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useStepper } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTaxConfig } from '../../../hooks/useTaxConfig';
import { CityFieldValue } from '../../../interfaces/FieldValues/City';
import { getEmptyTaxConfigFormInput } from '../../../utils/components/taxConfig/initialValues';
import { getTaxConfigSchema } from '../../../utils/components/taxConfig/schemas/taxConfig';
import { getTaxConfigDialogTitle, getTaxConfigTableName } from '../../../utils/components/taxConfig/taxConfigUtils';
import { TaxConfigGeneralDataStep } from './GeneralData/GeneralData';
import { TaxConfigRecapStep } from './Recap/Recap';
import { TaxConfigSubTableStep } from './SubTable/SubTable';
import { TaxConfigCreateDialogProps } from './TaxConfig.types';

export const TaxConfigCreateDialog = ({
  calculator,
  table,
  subTables,
  onClose,
  onSave,
}: TaxConfigCreateDialogProps) => {
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleEdit, handleError, handleNext } = useStepper();
  const { checkCanCreateTaxConfigTableValue } = useTaxConfig();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [config, setConfig] = useState(getEmptyTaxConfigFormInput(table, subTables));
  const debouncedConfig = useDebounce(config);
  const [canCreateTaxConfigTableValue, setCanCreateTaxConfigTableValue] = useState(true);

  useEffect(() => {
    const year = debouncedConfig.table.fields.find(({ code }) => code === 'year')?.value as number | undefined;
    // TODO: replace with some backend parameter
    const groupingReference = debouncedConfig.table.fields.find(({ fieldType }) => fieldType === SubValueType.City)
      ?.value as CityFieldValue | undefined;

    if (year) {
      checkCanCreateTaxConfigTableValue(
        calculator.id,
        table.code,
        year,
        groupingReference?.guid,
        setCanCreateTaxConfigTableValue,
      );
    }
    // eslint-disable-next-line
  }, [calculator.id, table.code, debouncedConfig.table.fields]);

  const canSave = useMemo(
    () => getTaxConfigSchema(subTables, t, canCreateTaxConfigTableValue).isValidSync(config),
    [canCreateTaxConfigTableValue, config, subTables, t],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleWorkingClose = useCallback(() => {
    onSave(config);
  }, [config, onSave]);
  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog
      fullScreen
      open
      title={getTaxConfigDialogTitle(calculator.description, table.code)}
      onClose={openCloseConfirmationDialog}
    >
      <Stepper
        activeStep={activeStep}
        error={error}
        steps={[
          {
            label: 'tax_config.tab.general_data',
            children: (
              <TaxConfigGeneralDataStep
                canCreateTaxConfigTableValue={canCreateTaxConfigTableValue}
                config={config}
                onChange={setConfig}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          },
          ...subTables.map<Tab>((subTable) => ({
            label: getTaxConfigTableName(calculator.description, subTable.code),
            children: (
              <TaxConfigSubTableStep
                calculator={calculator.description}
                config={config}
                subTable={subTable}
                onBack={handleBack}
                onChange={setConfig}
                onError={handleError}
                onNext={handleNext}
              />
            ),
          })),
          {
            label: 'tax_config.tab.recap',
            children: (
              <TaxConfigRecapStep
                calculator={calculator.description}
                config={config}
                subTables={subTables}
                onBack={handleBack}
                onEdit={handleEdit}
                onSave={onSave}
              />
            ),
          },
        ]}
      />
    </Dialog>
  );
};
