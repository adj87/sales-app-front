import { useEffect, useState } from 'react';
import { useParams, useLocation, RouteProps, useHistory } from 'react-router-dom';
import { History, Location } from 'history';

interface IUnknownObj {
  [key: string]: any;
}

interface IActionModal {
  name: 'initial' | 'new' | 'edit' | 'close' | 'nothing' | string;
  params?: number | string | null | { [key: string]: any };
}

interface IOpenAndRoutingProps {
  actionModal: IActionModal | undefined;
  history: History;
}

const getActionModal: IActionModal = (params: IUnknownObj, history: History) => {
  const isThisRouteForCreatingOrEdit = params.id || history.location.pathname.includes('new');

  let actionModal: IActionModal = { name: 'nothing', params: null };
  if (isThisRouteForCreatingOrEdit) {
    if (params.id === 'new') {
      actionModal = { name: 'new' };
    } else {
      actionModal = { name: 'edit', params: params.id };
    }
  } else {
    // @ts-ignore
    if (history.location.state?.closeModal && history.action === 'PUSH') {
      actionModal = { name: 'close' };
    } else {
      actionModal = { name: 'nothing' };
    }
  }
  return actionModal;
};

export const useOpenModalByRoutes = (): IOpenAndRoutingProps | null => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [openAndRoutingProps, setOpenAndRoutingProps] = useState<IOpenAndRoutingProps | null>(null);

  useEffect(() => {
    // @ts-ignore
    const actionModal = getActionModal(params, history);
    // @ts-ignore
    setOpenAndRoutingProps((oldState: IOpenAndRoutingProps) => ({ history, actionModal }));
  }, [history.location.pathname]);

  return openAndRoutingProps;
};
