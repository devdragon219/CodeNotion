import { GroupDetailFragment } from '../../gql/RealGimm.Web.Group.fragment';
import { GroupFormInput } from '../../interfaces/FormInputs/Group';
import { parsePermissionSummaryToPermissionsFormInput } from '../components/permissionsTable/parsePermissionSummaryFragment';

export const parseGroupToGroupFormInput = (group: GroupDetailFragment): GroupFormInput => ({
  groupId: group.id,
  name: group.name,
  description: group.description ?? '',
  permissions: parsePermissionSummaryToPermissionsFormInput(group.permissionSummary),
});
