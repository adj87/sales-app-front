import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export const useOpenModalByRoutes = () => {
  const [openModal, setOpenModal] = useState<false | string>(false);
  let { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  useEffect(() => {
    const isThisRouteForCreatingOrEdit = id || pathname.includes('new');
    if (isThisRouteForCreatingOrEdit) {
      if (id) return setOpenModal(id);
      return setOpenModal('new');
    }
    if (openModal) {
      setOpenModal(false);
    }
  }, [location.pathname]);

  return openModal;
};
