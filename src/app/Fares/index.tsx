import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IFare, IFareLine } from './duck/types/Fare';
import { columns, defaultValues } from './constants';
import FaresModal from './Modal';

const FaresComponent = ({
  fareLines,
  fares,
  setFareToCreateOrEdit,
  fareToForm,
  customers,
  fetchFareAndFareLines,
  fetchCustomers,
  fetchProducts,
  products,
  fetchFareWithCb,
  fetchFareToEdit,
  createFare,
  editFare,
  deleteFare,
  fetchFares,
}: any) => {
  useEffect(() => {
    fetchFareAndFareLines();
    fetchCustomers();
    fetchProducts();
  }, []);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={fareLines}
        onAddButton={() => setFareToCreateOrEdit(defaultValues)}
        tableName={'fares'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const fare: IFare = datatableRowInfo.original;
          fetchFareToEdit(fare.customer_id);
        }}
        deleteOnRowPress={(datatableRowInfo: any) => {
          const fare: IFareLine = datatableRowInfo.original;
          deleteFare(fare.customer_id);
        }}
        messageOnDelete={(fl: IFareLine) => `${fl.customer_id} - ${fl.customer_name}`}
      />
      {Boolean(fareToForm) && (
        <FaresModal
          fetchFareWithCb={fetchFareWithCb}
          onCancel={() => setFareToCreateOrEdit(null)}
          customers={customers}
          fares={fares}
          fareLines={fareLines}
          products={products}
          fare={fareToForm}
          fetchFares={fetchFareAndFareLines}
          onConfirm={(fare: IFare, isCreating: boolean) => {
            if (isCreating) {
              createFare(fare);
            } else {
              editFare(fare);
            }
            return setFareToCreateOrEdit(null);
          }}
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
