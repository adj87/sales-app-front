import React from 'react';
import { BarLoader } from 'react-spinners';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';
import LayerOutOfRoot from '../../components/Modal/Layer';

interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  console.log(loading);
  return (
    <>
      {loading && (
        <LayerOutOfRoot>
          <div className={`w-full h-full fixed flex justify-center items-center z-100 left-0 top-0 opacity-50 fixed `} />
          <div className="z-20 fixed w-full h-full justify-center items-center top-0 left-0 flex">
            <BarLoader height={'10'} width="400" color={'orange'} loading={loading} />
          </div>
        </LayerOutOfRoot>
      )}
    </>
  );
};

const mapState = (state: AppStoreInterface) => ({
  loading: state.pendingRequests > 0,
});

export default connect(mapState, {})(Loading);
