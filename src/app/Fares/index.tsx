import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IFare } from './duck/types/Fare';
import { columns, defaultValues } from './constants';
import { useOpenModalByRoutes } from '../../components/Table/useOpenModalByRoutes';
import FaresModal from './Modal';

const FaresComponent = ({
  fetchFares,
  fares,
  history,
  setFareToCreateOrEdit,
  fareToForm,
  customers,
  fetchFareCustomersAndProducts,
  products,
  setFareToInheritFrom,
  fetchFareWithCb,
  fareToInheritFrom,
}: any) => {
  useEffect(() => {
    fetchFares();
  }, []);
  const openModal = useOpenModalByRoutes();
  useEffect(() => {
    if (openModal === 'new') {
      //CREATE
      return setFareToCreateOrEdit(defaultValues);
    }
    // @ts-ignore
    if (openModal) {
      //EDIT
      return fetchFareCustomersAndProducts(openModal);
    }
    //CLOSE
    if (fareToForm !== null) return setFareToCreateOrEdit(null);
  }, [openModal]);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={fares}
        onAddButton={() => history.push('/fares/new')}
        tableName={'fares'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const fare: IFare = datatableRowInfo.original;
          history.push(`/fares/${fare.customer_id}`);
        }}
      />
      {Boolean(fareToForm) && (
        <FaresModal
          fetchFareWithCb={fetchFareWithCb}
          onCancel={() => history.push(`/fares`)}
          customers={customers}
          fares={fares}
          products={products}
          fare={fareToForm}
          setFareToInheritFrom={setFareToInheritFrom}
          fareToInheritFrom={fareToInheritFrom}
        />
      )}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  fares: state.fares.data,
  products: state.products.data,
  customers: state.customers.data,
  fareToForm: state.fares.elementToCreateOrEdit,
  fareToInheritFrom: state.fares.fareToInheritFrom,
});

const mapDispatch = {
  ...operations,
};

const FaresComponentWithHistory = withRouter(FaresComponent);

export const Fares = connect(mapState, mapDispatch)(FaresComponentWithHistory);
