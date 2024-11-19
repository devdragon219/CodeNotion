import {
  BarChart,
  Crop169,
  DonutLarge,
  PieChart,
  PowerInput,
  SsidChart,
  TableChart,
  ViewHeadline,
} from '@mui/icons-material';
import { DASHBOARD_WIDGET_MIN_WIDTH } from '@realgimm5/frontend-common/configs';
import { DashboardWidgetConfiguration, DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';

import { TicketsCompletedChartWidget } from '../../components/core/DashboardWidgets/TicketsCompletedChart/TicketsCompletedChart';
import { TicketsCountChartWidget } from '../../components/core/DashboardWidgets/TicketsCountChart/TicketsCountChart';
import { TicketsExcludedFromMaintenanceContractChartWidget } from '../../components/core/DashboardWidgets/TicketsExcludedFromMaintenanceContractChart/TicketsExcludedFromMaintenanceContractChart';
import { TicketsExcludedFromMaintenanceContractExpensesChartWidget } from '../../components/core/DashboardWidgets/TicketsExcludedFromMaintenanceContractExpensesChart/TicketsExcludedFromMaintenanceContractExpensesChart';
import { TicketsExcludedFromMaintenanceContractExpensesPercentageWidget } from '../../components/core/DashboardWidgets/TicketsExcludedFromMaintenanceContractExpensesPercentage/TicketsExcludedFromMaintenanceContractExpensesPercentage';
import { TicketsExcludedFromMaintenanceContractPercentageWidget } from '../../components/core/DashboardWidgets/TicketsExcludedFromMaintenanceContractPercentage/TicketsExcludedFromMaintenanceContractPercentage';
import { TicketsExcludedFromMaintenanceContractTotalExpensesCountWidget } from '../../components/core/DashboardWidgets/TicketsExcludedFromMaintenanceContractTotalExpensesCount/TicketsExcludedFromMaintenanceContractTotalExpensesCount';
import { TicketsExpirationsListWidget } from '../../components/core/DashboardWidgets/TicketsExpirationsList/TicketsExpirationsList';
import { TicketsMandatoryByLawExpiredWidget } from '../../components/core/DashboardWidgets/TicketsMandatoryByLawExpired/TicketsMandatoryByLawExpired';
import { TicketsMandatoryByLawListWidget } from '../../components/core/DashboardWidgets/TicketsMandatoryByLawList/TicketsMandatoryByLawList';
import { TicketsMandatoryByLawStatusPercentageWidget } from '../../components/core/DashboardWidgets/TicketsMandatoryByLawStatusPercentage/TicketsMandatoryByLawStatusPercentage';
import { TicketsMandatoryByLawTypePercentageWidget } from '../../components/core/DashboardWidgets/TicketsMandatoryByLawTypePercentage/TicketsMandatoryByLawTypePercentage';
import { TicketsPreventativeExpiredWidget } from '../../components/core/DashboardWidgets/TicketsPreventativeExpired/TicketsPreventativeExpired';
import { TicketsPriorityPercentageWidget } from '../../components/core/DashboardWidgets/TicketsPriorityPercentage/TicketsPriorityPercentage';
import { TicketsSLARespectingPercentageWidget } from '../../components/core/DashboardWidgets/TicketsSLARespectingPercentage/TicketsSLARespectingPercentage';
import { TicketsStatusAverageResolutionDurationWidget } from '../../components/core/DashboardWidgets/TicketsStatusAverageResolutionDuration/TicketsStatusAverageResolutionDuration';
import { TicketsStatusChartWidget } from '../../components/core/DashboardWidgets/TicketsStatusChart/TicketsStatusChart';
import { TicketsStatusCountWidget } from '../../components/core/DashboardWidgets/TicketsStatusCount/TicketsStatusCount';
import { TicketsStatusPercentageWidget } from '../../components/core/DashboardWidgets/TicketsStatusPercentage/TicketsStatusPercentage';
import { TicketsTotalExpensesChartWidget } from '../../components/core/DashboardWidgets/TicketsTotalExpensesChart/TicketsTotalExpensesChart';
import { TicketsTypeChartWidget } from '../../components/core/DashboardWidgets/TicketsTypeChart/TicketsTypeChart';
import { TicketsTypeListWidget } from '../../components/core/DashboardWidgets/TicketsTypeList/TicketsTypeList';
import { DashboardWidgetType } from '../../enums/DashboardWidgetType';

export const getFacilityDashboardWidgetConfigurations = (): DashboardWidgetConfiguration[] => {
  const FacilityDashboardWidgetTypes = [
    DashboardWidgetType.TicketsChecklistExpirationsList,
    DashboardWidgetType.TicketsCompletedChart,
    DashboardWidgetType.TicketsCountChart,
    DashboardWidgetType.TicketsExcludedFromMaintenanceContractChart,
    DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesChart,
    DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesPercentage,
    DashboardWidgetType.TicketsExcludedFromMaintenanceContractPercentage,
    DashboardWidgetType.TicketsExcludedFromMaintenanceContractTotalExpensesCount,
    DashboardWidgetType.TicketsIssueExpirationsList,
    DashboardWidgetType.TicketsMandatoryByLawExpirationsList,
    DashboardWidgetType.TicketsMandatoryByLawExpired,
    DashboardWidgetType.TicketsMandatoryByLawList,
    DashboardWidgetType.TicketsMandatoryByLawStatusPercentage,
    DashboardWidgetType.TicketsMandatoryByLawTypePercentage,
    DashboardWidgetType.TicketsPreventativeExpired,
    DashboardWidgetType.TicketsPriorityPercentage,
    DashboardWidgetType.TicketsSLARespectingPercentage,
    DashboardWidgetType.TicketsStatusAverageResolutionDuration,
    DashboardWidgetType.TicketsStatusChart,
    DashboardWidgetType.TicketsStatusCount,
    DashboardWidgetType.TicketsStatusPercentage,
    DashboardWidgetType.TicketsTotalExpensesChart,
    DashboardWidgetType.TicketsTypeChart,
    DashboardWidgetType.TicketsTypeList,
  ] as const;
  type FacilityDashboardWidgetType = (typeof FacilityDashboardWidgetTypes)[number];

  const getFacilityDashboardWidgetMinWidth = (type: FacilityDashboardWidgetType) => {
    switch (type) {
      case DashboardWidgetType.TicketsMandatoryByLawStatusPercentage:
      case DashboardWidgetType.TicketsMandatoryByLawTypePercentage:
      case DashboardWidgetType.TicketsPriorityPercentage:
      case DashboardWidgetType.TicketsStatusPercentage:
      case DashboardWidgetType.TicketsTypeList:
        return DASHBOARD_WIDGET_MIN_WIDTH;
      case DashboardWidgetType.TicketsChecklistExpirationsList:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesPercentage:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractPercentage:
      case DashboardWidgetType.TicketsIssueExpirationsList:
      case DashboardWidgetType.TicketsMandatoryByLawExpirationsList:
      case DashboardWidgetType.TicketsMandatoryByLawExpired:
      case DashboardWidgetType.TicketsMandatoryByLawList:
      case DashboardWidgetType.TicketsPreventativeExpired:
      case DashboardWidgetType.TicketsSLARespectingPercentage:
        return 3;
      case DashboardWidgetType.TicketsCompletedChart:
      case DashboardWidgetType.TicketsCountChart:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractChart:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesChart:
      case DashboardWidgetType.TicketsStatusChart:
      case DashboardWidgetType.TicketsTotalExpensesChart:
      case DashboardWidgetType.TicketsTypeChart:
        return 5;
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractTotalExpensesCount:
      case DashboardWidgetType.TicketsStatusAverageResolutionDuration:
      case DashboardWidgetType.TicketsStatusCount:
        return 6;
    }
  };

  const getFacilityDashboardWidgetIcon = (type: FacilityDashboardWidgetType) => {
    switch (type) {
      case DashboardWidgetType.TicketsChecklistExpirationsList:
      case DashboardWidgetType.TicketsIssueExpirationsList:
      case DashboardWidgetType.TicketsMandatoryByLawExpirationsList:
        return <ViewHeadline />;
      case DashboardWidgetType.TicketsCompletedChart:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractChart:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesChart:
      case DashboardWidgetType.TicketsStatusChart:
        return <SsidChart />;
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesPercentage:
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractPercentage:
      case DashboardWidgetType.TicketsSLARespectingPercentage:
        return <DonutLarge />;
      case DashboardWidgetType.TicketsMandatoryByLawExpired:
      case DashboardWidgetType.TicketsPreventativeExpired:
        return <Crop169 />;
      case DashboardWidgetType.TicketsMandatoryByLawStatusPercentage:
      case DashboardWidgetType.TicketsMandatoryByLawTypePercentage:
      case DashboardWidgetType.TicketsPriorityPercentage:
      case DashboardWidgetType.TicketsStatusPercentage:
        return <PieChart />;
      case DashboardWidgetType.TicketsExcludedFromMaintenanceContractTotalExpensesCount:
      case DashboardWidgetType.TicketsStatusAverageResolutionDuration:
      case DashboardWidgetType.TicketsStatusCount:
        return <PowerInput />;
      case DashboardWidgetType.TicketsMandatoryByLawList:
      case DashboardWidgetType.TicketsTypeList:
        return <TableChart />;
      case DashboardWidgetType.TicketsCountChart:
      case DashboardWidgetType.TicketsTotalExpensesChart:
      case DashboardWidgetType.TicketsTypeChart:
        return <BarChart />;
    }
  };

  const getFacilityDashboardWidgetComponent = (type: FacilityDashboardWidgetType) => {
    const Component = (props: DashboardWidgetProps) => {
      switch (type) {
        case DashboardWidgetType.TicketsChecklistExpirationsList:
          return <TicketsExpirationsListWidget {...props} isIssue={false} isMandatoryByLaw={false} />;
        case DashboardWidgetType.TicketsCompletedChart:
          return <TicketsCompletedChartWidget {...props} />;
        case DashboardWidgetType.TicketsCountChart:
          return <TicketsCountChartWidget {...props} />;
        case DashboardWidgetType.TicketsExcludedFromMaintenanceContractChart:
          return <TicketsExcludedFromMaintenanceContractChartWidget {...props} />;
        case DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesChart:
          return <TicketsExcludedFromMaintenanceContractExpensesChartWidget {...props} />;
        case DashboardWidgetType.TicketsExcludedFromMaintenanceContractExpensesPercentage:
          return <TicketsExcludedFromMaintenanceContractExpensesPercentageWidget {...props} />;
        case DashboardWidgetType.TicketsExcludedFromMaintenanceContractPercentage:
          return <TicketsExcludedFromMaintenanceContractPercentageWidget {...props} />;
        case DashboardWidgetType.TicketsExcludedFromMaintenanceContractTotalExpensesCount:
          return <TicketsExcludedFromMaintenanceContractTotalExpensesCountWidget {...props} />;
        case DashboardWidgetType.TicketsIssueExpirationsList:
          return <TicketsExpirationsListWidget {...props} isIssue={true} isMandatoryByLaw={false} />;
        case DashboardWidgetType.TicketsMandatoryByLawExpirationsList:
          return <TicketsExpirationsListWidget {...props} isIssue={false} isMandatoryByLaw />;
        case DashboardWidgetType.TicketsMandatoryByLawExpired:
          return <TicketsMandatoryByLawExpiredWidget {...props} />;
        case DashboardWidgetType.TicketsMandatoryByLawList:
          return <TicketsMandatoryByLawListWidget {...props} />;
        case DashboardWidgetType.TicketsMandatoryByLawStatusPercentage:
          return <TicketsMandatoryByLawStatusPercentageWidget {...props} />;
        case DashboardWidgetType.TicketsMandatoryByLawTypePercentage:
          return <TicketsMandatoryByLawTypePercentageWidget {...props} />;
        case DashboardWidgetType.TicketsPreventativeExpired:
          return <TicketsPreventativeExpiredWidget {...props} />;
        case DashboardWidgetType.TicketsPriorityPercentage:
          return <TicketsPriorityPercentageWidget {...props} />;
        case DashboardWidgetType.TicketsSLARespectingPercentage:
          return <TicketsSLARespectingPercentageWidget {...props} />;
        case DashboardWidgetType.TicketsStatusAverageResolutionDuration:
          return <TicketsStatusAverageResolutionDurationWidget {...props} />;
        case DashboardWidgetType.TicketsStatusChart:
          return <TicketsStatusChartWidget {...props} />;
        case DashboardWidgetType.TicketsStatusCount:
          return <TicketsStatusCountWidget {...props} />;
        case DashboardWidgetType.TicketsStatusPercentage:
          return <TicketsStatusPercentageWidget {...props} />;
        case DashboardWidgetType.TicketsTotalExpensesChart:
          return <TicketsTotalExpensesChartWidget {...props} />;
        case DashboardWidgetType.TicketsTypeChart:
          return <TicketsTypeChartWidget {...props} />;
        case DashboardWidgetType.TicketsTypeList:
          return <TicketsTypeListWidget {...props} />;
      }
    };

    return Component;
  };

  return Object.values(FacilityDashboardWidgetTypes).map((type) => ({
    icon: getFacilityDashboardWidgetIcon(type),
    minWidth: getFacilityDashboardWidgetMinWidth(type),
    title: `core.enum.dashboard_widget_type.${type}`,
    type,
    getComponent: getFacilityDashboardWidgetComponent(type),
  }));
};
