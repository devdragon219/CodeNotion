import { Dashboard } from '@realgimm5/frontend-common/components';
import { useMemo } from 'react';

import {
  GetFacilityDashboardDocument,
  UpdateFacilityDashboardDocument,
} from '../../../gql/RealGimm.Web.User.operation';
import { getFacilityDashboardWidgetConfigurations } from '../../../utils/dashboard/getFacilityDashboardWidgetConfigurations';

export default function Maintenance() {
  const widgetConfigurations = useMemo(() => getFacilityDashboardWidgetConfigurations(), []);

  return (
    <Dashboard
      mutation={UpdateFacilityDashboardDocument}
      mutationKey="updateFacilityDashboardWidgets"
      query={GetFacilityDashboardDocument}
      queryKey="facilityDashboard"
      title="dashboard.title.facility"
      widgetConfigurations={widgetConfigurations}
    />
  );
}
