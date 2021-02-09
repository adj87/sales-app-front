import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { IAlert } from './duck/types/IAlert';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';
import operations from './duck/operations';

interface AlertsProps {
  alerts: IAlert[];
  deleteAlert: Function;
}

const Alerts = ({ alerts, deleteAlert }: AlertsProps) => {
  const container = document.getElementById('alerts') || document.createElement('div');
  container.className = `fixed top-0 right-0 w-auto flex justify-end z-50 ${alerts.length > 0 ? 'p-5' : ''} flex-col items-end`;
  return ReactDOM.createPortal(
    alerts.map((al: IAlert) => <Alert alert={al} onClickX={deleteAlert} />),
    container,
  );
};

const Alert = ({ alert, onClickX }: { alert: IAlert; onClickX: Function }) => {
  return (
    <div className={`px-5 py-3 md:w-64 w-full rounded-md text-white shadow flex justify-between items-center my-2 bg-${alert.type}-dark`}>
      <span>{alert.message}</span>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="text-white cursor-pointer transform hover:scale-125 transition duration-100"
        onClick={() => onClickX(alert.id)}
      />
    </div>
  );
};

const mapStateToProps = (state: AppStoreInterface) => ({
  alerts: state.alerts,
});

const mapDispatchToProps = {
  ...operations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
