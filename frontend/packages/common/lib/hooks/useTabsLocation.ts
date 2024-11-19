import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useTabsLocation = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const initialTab = useMemo(() => Number(hash.slice(1)), [hash]);
  const onChange = useCallback(
    (tab: number) => {
      navigate(`#${tab}`, { replace: true });
    },
    [navigate],
  );

  return { initialTab, onChange };
};
