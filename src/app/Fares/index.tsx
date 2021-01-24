import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IFare } from './duck/types/Fare';
import { columns, defaultValues } from './constants';
import { useOpenModalByRoutes } from '../../components/Table/useOpenModalByRoutes';
import FaresModal from './Modal';

const FaresComponent = ({
  fetchFareLines,
  fareLines,
  fares,
  setFareToCreateOrEdit,
  fareToForm,
  customers,
  fetchFaresLinesFareCustomersAndProducts,
  products,
  setFareToInheritFrom,
  fetchFareWithCb,
  fareToInheritFrom,
}: any) => {
  const state = useOpenModalByRoutes();
  // @ts-ignore

  useEffect(() => {
    if (state?.actionModal)
      switch (state?.actionModal.name) {
        case 'new':
          fetchFaresLinesFareCustomersAndProducts(true, null, true);
          return setFareToCreateOrEdit(defaultValues);
        case 'close':
          return setFareToCreateOrEdit(null);
        case 'edit':
          return fetchFaresLinesFareCustomersAndProducts(true, state?.actionModal?.params, true);
        case 'nothing':
          return fetchFaresLinesFareCustomersAndProducts(true);
      }
  }, [state]);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={fareLines}
        onAddButton={() => state && state.history.push('/fares/new')}
        tableName={'fares'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const fare: IFare = datatableRowInfo.original;
          state && state.history.push(`/fares/${fare.customer_id}`);
        }}
      />
      {Boolean(fareToForm) && (
        <FaresModal
          onConfirm={(fare: IFare) => console.log('la fare', fare)}
          fetchFareWithCb={fetchFareWithCb}
          onCancel={() =>
            state && state.history.push({ pathname: `/fares`, state: { closeModal: true } })
          }
          customers={customers}
          fares={fares}
          fareLines={fareLines}
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
  fareLines: state.fares.data.fareLines,
  fares: state.fares.data.fares,
  products: state.products.data,
  customers: state.customers.data,
  fareToForm: state.fares.elementToCreateOrEdit,
  fareToInheritFrom: state.fares.fareToInheritFrom,
});

const mapDispatch = {
  ...operations,
};

export const Fares = connect(mapState, mapDispatch)(FaresComponent);
