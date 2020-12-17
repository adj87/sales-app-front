import React from 'react';
import { BarLoader } from 'react-spinners';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';

interface LoadingProps {
  loading?: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      {loading && (
        <>
          <div
            className={`w-full h-full fixed flex justify-center items-center z-10 left-0 top-0 opacity-50 fixed bg-blur-lg  bg-primary-light`}
          />
          <div className="z-20 fixed w-full h-full justify-center items-center top-0 left-0 flex">
            <BarLoader height={'10'} width="400" color={'orange'} loading={loading} />
          </div>
        </>
      )}
    </>
  );
};

const mapState = (state: AppStoreInterface) => ({
  loading: state.loading,
});

export default connect(mapState, null)(Loading);
