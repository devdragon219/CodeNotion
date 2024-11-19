import { DonutLarge, Map, PieChart, SsidChart, ViewHeadline, ViewStream } from '@mui/icons-material';
import { DASHBOARD_WIDGET_MIN_WIDTH } from '@realgimm5/frontend-common/configs';
import { DashboardWidgetConfiguration, DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';

import { BillPaymentsStatusPercentageWidget } from '../../components/core/DashboardWidgets/BillPaymentsStatusPercentage/BillPaymentsStatusPercentage';
import { ContractsExpirationsListWidget } from '../../components/core/DashboardWidgets/ContractsExpirationsList/ContractsExpirationsList';
import { ContractsRecapWidget } from '../../components/core/DashboardWidgets/ContractsRecap/ContractsRecap';
import { EstateMapWidget } from '../../components/core/DashboardWidgets/EstateMap/EstateMap';
import { EstateOccupationStatusPercentageWidget } from '../../components/core/DashboardWidgets/EstateOccupationStatusPercentage/EstateOccupationStatusPercentage';
import { EstateUnitTypesPercentageWidget } from '../../components/core/DashboardWidgets/EstateUnitTypesPercentage/EstateUnitTypesPercentage';
//import { IOComparisonWidget } from '../../components/core/DashboardWidgets/IncomeOutcomeComparisonChart/IncomeOutcomeComparisonChart';
import { NotificationsListWidget } from '../../components/core/DashboardWidgets/NotificationsList/NotificationsList';
import { RealEstateRecapWidget } from '../../components/core/DashboardWidgets/RealEstateRecap/RealEstateRecap';
import { UsageTypesPercentageWidget } from '../../components/core/DashboardWidgets/UsageTypesPercentage/UsageTypesPercentage';
import { DashboardWidgetType } from '../../enums/DashboardWidgetType';

export const getHomeDashboardWidgetConfigurations = (): DashboardWidgetConfiguration[] => {
  const HomeDashboardWidgetTypes = [
    DashboardWidgetType.ContractsActiveExpirationsList,
    DashboardWidgetType.ContractsPassiveExpirationsList,
    DashboardWidgetType.ContractsRecap,
    DashboardWidgetType.EstateMap,
    //DashboardWidgetType.IncomeOutcomeComparisonChart,
    DashboardWidgetType.EstateUnitTypesPercentage,
    DashboardWidgetType.NotificationsList,
    DashboardWidgetType.EstateOccupationStatusPercentage,
    DashboardWidgetType.BillPaymentsStatusPercentage,
    DashboardWidgetType.RealEstateRecap,
    DashboardWidgetType.UsageTypesPercentage,
  ] as const;
  type HomeDashboardWidgetType = (typeof HomeDashboardWidgetTypes)[number];

  const getHomeDashboardWidgetMinWidth = (type: HomeDashboardWidgetType) => {
    switch (type) {
      case DashboardWidgetType.ContractsActiveExpirationsList:
      case DashboardWidgetType.ContractsPassiveExpirationsList:
      case DashboardWidgetType.ContractsRecap:
      case DashboardWidgetType.NotificationsList:
        return 3;
      case DashboardWidgetType.EstateMap:
        return 10;
      //case DashboardWidgetType.IncomeOutcomeComparisonChart:
      case DashboardWidgetType.EstateOccupationStatusPercentage:
        return 5;
      case DashboardWidgetType.EstateUnitTypesPercentage:
      case DashboardWidgetType.BillPaymentsStatusPercentage:
      case DashboardWidgetType.UsageTypesPercentage:
      case DashboardWidgetType.RealEstateRecap:
        return DASHBOARD_WIDGET_MIN_WIDTH;
    }
  };

  const getHomeDashboardWidgetIcon = (type: HomeDashboardWidgetType) => {
    switch (type) {
      case DashboardWidgetType.ContractsActiveExpirationsList:
      case DashboardWidgetType.ContractsPassiveExpirationsList:
      case DashboardWidgetType.NotificationsList:
        return <ViewHeadline />;
      case DashboardWidgetType.EstateMap:
        return <Map />;
      //case DashboardWidgetType.IncomeOutcomeComparisonChart:
      case DashboardWidgetType.EstateOccupationStatusPercentage:
        return <SsidChart />;
      case DashboardWidgetType.EstateUnitTypesPercentage:
        return <PieChart />;
      case DashboardWidgetType.BillPaymentsStatusPercentage:
      case DashboardWidgetType.UsageTypesPercentage:
        return <DonutLarge />;
      case DashboardWidgetType.ContractsRecap:
      case DashboardWidgetType.RealEstateRecap:
        return <ViewStream />;
    }
  };

  const getHomeDashboardWidgetComponent = (type: HomeDashboardWidgetType) => {
    const Component = (props: DashboardWidgetProps) => {
      switch (type) {
        case DashboardWidgetType.ContractsActiveExpirationsList:
          return <ContractsExpirationsListWidget {...props} isActive />;
        case DashboardWidgetType.ContractsPassiveExpirationsList:
          return <ContractsExpirationsListWidget {...props} isActive={false} />;
        case DashboardWidgetType.ContractsRecap:
          return <ContractsRecapWidget {...props} />;
        case DashboardWidgetType.EstateMap:
          return <EstateMapWidget {...props} />;
        case DashboardWidgetType.EstateUnitTypesPercentage:
          return <EstateUnitTypesPercentageWidget {...props} />;
        // case DashboardWidgetType.IncomeOutcomeComparisonChart:
        //   return <IOComparisonWidget {...props} />;
        case DashboardWidgetType.NotificationsList:
          return <NotificationsListWidget {...props} />;
        case DashboardWidgetType.EstateOccupationStatusPercentage:
          return <EstateOccupationStatusPercentageWidget {...props} />;
        case DashboardWidgetType.BillPaymentsStatusPercentage:
          return <BillPaymentsStatusPercentageWidget {...props} />;
        case DashboardWidgetType.RealEstateRecap:
          return <RealEstateRecapWidget {...props} />;
        case DashboardWidgetType.UsageTypesPercentage:
          return <UsageTypesPercentageWidget {...props} />;
      }
    };

    return Component;
  };

  return Object.values(HomeDashboardWidgetTypes).map((type) => ({
    icon: getHomeDashboardWidgetIcon(type),
    minWidth: getHomeDashboardWidgetMinWidth(type),
    title: `core.enum.dashboard_widget_type.${type}`,
    type,
    getComponent: getHomeDashboardWidgetComponent(type),
  }));
};
