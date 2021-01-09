import { useEffect, useState } from 'react';
import { useParams, useLocation, RouteProps, useHistory } from 'react-router-dom';
import { History, Location } from 'history';

interface IOpenAndRoutingProps {
  open: false | string;
  location: Location;
  history: History;
}

export const useOpenModalByRoutes = (): IOpenAndRoutingProps => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const location = useLocation();
  const [openAndRoutingProps, setOpenAndRoutingProps] = useState<IOpenAndRoutingProps>({
    open: false,
    location: location,
    history: history,
  });
  useEffect(() => {
    const isThisRouteForCreatingOrEdit = params.id || location.pathname.includes('new');
    let open: string | false = false;
    if (isThisRouteForCreatingOrEdit) {
      if (params.id) {
        open = params.id;
      } else {
        open = 'new';
      }
    }
    if (openAndRoutingProps.open) {
      open = false;
    }
    setOpenAndRoutingProps((oldState: IOpenAndRoutingProps) => ({ ...oldState, open }));
  }, [location.pathname]);

  return openAndRoutingProps;
};
