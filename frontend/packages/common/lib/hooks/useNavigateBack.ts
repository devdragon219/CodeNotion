import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateBack = (fallback: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };
};
