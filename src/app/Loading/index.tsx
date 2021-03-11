import React from 'react';
import ReactDOM from 'react-dom';
import { BarLoader } from 'react-spinners';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';
import LayerOutOfRoot from '../../components/Modal/Layer';

interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  const container = document.getElementById('loading') || document.createElement('div');
  container.className = `modalclass overflow-x-hidden overflow-y-auto fixed inset-0 ${loading ? 'block bg-blur-lg bg-primary-opacity' : 'hidden'}`;
  return (
    <>
      {loading &&
        ReactDOM.createPortal(
          <>
            <div className={`w-full h-full fixed flex justify-center items-center z-100 left-0 top-0 opacity-50 fixed `} />
            <div className="z-20 fixed w-full h-full justify-center items-center top-0 left-0 flex">
              <BarLoader height={'10'} width="400" color={'orange'} loading={loading} />
            </div>
          </>,
          container,
        )}
    </>
  );
};

const mapState = (state: AppStoreInterface) => ({
  loading: state.pendingRequests > 0,
});

export default connect(mapState, {})(Loading);
