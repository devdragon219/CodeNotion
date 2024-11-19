import { Card, CardContent, CardHeader } from '@mui/material';
import { Loader, Stepper } from '@realgimm5/frontend-common/components';
import { useSnackbar } from '@realgimm5/frontend-common/contexts';
import { useStepper } from '@realgimm5/frontend-common/hooks';
import { downloadFile } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReportGeneratorFieldsStep } from '../../../../components/domains/ReportGenerator/Fields/Fields';
import { ReportGeneratorGeneralDataStep } from '../../../../components/domains/ReportGenerator/GeneralData/GeneralData';
import { RawFeature } from '../../../../enums/RawFeature';
import { useGenerateReportsMutation } from '../../../../gql/RealGimm.Web.ReportGenerator.operation';
import { useFeature } from '../../../../hooks/useFeature';
import { ReportGeneratorFormInput } from '../../../../interfaces/FormInputs/ReportGenerator';
import { getEmptyReportGeneratorFormInput } from '../../../../utils/reportGenerator/initialValues';
import { parseReportGeneratorFormInputToGenerateReportVariables } from '../../../../utils/reportGenerator/parseReportGeneratorFormInput';

export default function ReportGenerator() {
  useFeature(RawFeature.COMMON_REPORT_GENERATORS);
  const { t } = useTranslation();
  const { activeStep, error, handleBack, handleError, handleNext } = useStepper();
  const { showError } = useSnackbar();
  const [, generateReportsMutation] = useGenerateReportsMutation();
  const [loading, setLoading] = useState(false);
  const [reportGenerator, setReportGenerator] = useState(getEmptyReportGeneratorFormInput());

  const handleSave = useCallback(
    async (reportGenerator: ReportGeneratorFormInput) => {
      setLoading(true);
      const result = await generateReportsMutation(
        parseReportGeneratorFormInputToGenerateReportVariables(reportGenerator),
      );
      setLoading(false);
      if (result.data?.reportGenerator.generateReports.isSuccess) {
        result.data.reportGenerator.generateReports.value?.forEach((it) => {
          if (it?.resourceUrl) {
            downloadFile(it.resourceUrl);
          }
        });
      } else {
        showError(result.data?.reportGenerator.generateReports.validationErrors);
      }
    },
    [generateReportsMutation, showError],
  );

  return (
    <Card>
      {loading && <Loader />}
      <CardHeader title={t('report_generator.title')} titleTypographyProps={{ variant: 'h2' }} />
      <CardContent>
        <Stepper
          activeStep={activeStep}
          error={error}
          steps={[
            {
              label: 'report_generator.tab.general_data',
              children: (
                <ReportGeneratorGeneralDataStep
                  reportGenerator={reportGenerator}
                  onChange={setReportGenerator}
                  onError={handleError}
                  onNext={handleNext}
                />
              ),
            },
            {
              label: 'report_generator.tab.fields',
              children: (
                <ReportGeneratorFieldsStep
                  reportGenerator={reportGenerator}
                  onBack={handleBack}
                  onChange={setReportGenerator}
                  onSave={handleSave}
                />
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
