import { Dashboard } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';

import { UNSUPPORTED_RAW_FEATURES } from '../../../configs/features';
import { menuConfig } from '../../../configs/menu';
import { GetMainDashboardDocument, UpdateMainDashboardDocument } from '../../../gql/RealGimm.Web.User.operation';
import { getHomeDashboardWidgetConfigurations } from '../../../utils/dashboard/getHomeDashboardWidgetConfigurations';

const USE_HOMEPAGE = import.meta.env.VITE_USE_HOMEPAGE !== 'false';
export default function Home() {
  const widgetConfigurations = useMemo(() => getHomeDashboardWidgetConfigurations(), []);

  return (
    <Dashboard
      mutation={UpdateMainDashboardDocument}
      mutationKey="updateMainDashboardWidgets"
      query={GetMainDashboardDocument}
      queryKey="mainDashboard"
      title="dashboard.title.main"
      widgetConfigurations={widgetConfigurations}
      shouldRedirect={
        !USE_HOMEPAGE
          ? {
              menu: menuConfig,
              unsupportedFeatures: UNSUPPORTED_RAW_FEATURES,
            }
          : undefined
      }
    />
  );
}
