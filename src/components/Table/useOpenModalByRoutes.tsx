import { useEffect, useState } from 'react';
import { useParams, useLocation, RouteProps, useHistory } from 'react-router-dom';
import { History, Location } from 'history';

interface IOpenAndRoutingProps {
  open: false | string;
  history: History;
}

export const useOpenModalByRoutes = (): IOpenAndRoutingProps => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [openAndRoutingProps, setOpenAndRoutingProps] = useState<IOpenAndRoutingProps>({
    open: false,
    history: history,
  });
  useEffect(() => {
    const isThisRouteForCreatingOrEdit = params.id || history.location.pathname.includes('new');

    let open: string | false = false;
    if (isThisRouteForCreatingOrEdit) {
      if (params.id) {
        open = params.id;
      } else {
        open = 'new';
      }
    }
    // @ts-ignore
    if (history.location.state?.closeModal) {
      open = 'close';
    }
    setOpenAndRoutingProps((oldState: IOpenAndRoutingProps) => ({ ...oldState, open }));
  }, [history.location.pathname]);

  return openAndRoutingProps;
};
