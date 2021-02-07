import React from 'react';
import ReactDOM from 'react-dom';
import { IAlert } from './duck/types/IAlert';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';

const Alerts = (alerts: IAlert[]) => {
  const container = document.getElementById('alerts') || document.createElement('div');
  return ReactDOM.createPortal(
    alerts.map((al: IAlert) => <div className="">{al.message}</div>),
    container,
  );
};

const Alert = (alert: IAlert) => {
  return <div className="fixed top-0 right-0 z-50">HOLAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>;
};

const mapStateToProps = (state: AppStoreInterface) => ({});

export default connect(mapStateToProps, null)(Alerts);
