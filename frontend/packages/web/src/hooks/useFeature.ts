import { useAuth } from '@realgimm5/frontend-common/contexts';
import { Permission } from '@realgimm5/frontend-common/enums';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { UNSUPPORTED_RAW_FEATURES } from '../configs/features';
import { Feature } from '../interfaces/Feature';

export const useFeature = (feature: Feature) => {
  const { isSignedIn, permissions } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn || Object.keys(permissions).length === 0) {
      navigate('/auth');
    } else if (!permissions[feature] || UNSUPPORTED_RAW_FEATURES.includes(feature)) {
      throw Error();
    }
    // eslint-disable-next-line
  }, []);

  const permission = useMemo(() => permissions[feature] ?? [], [permissions, feature]);

  return {
    canCreate: permission.includes(Permission.Create),
    canRead: permission.includes(Permission.Read),
    canUpdate: permission.includes(Permission.Update),
    canDelete: permission.includes(Permission.Delete),
  };
};
