import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useLocation, useParams } from 'react-router-dom';

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
  history,
  setFareToCreateOrEdit,
  fareToForm,
  customers,
  fetchFaresLinesFareCustomersAndProducts,
  fetchFareLinesCustomersAndProducts,
  products,
  setFareToInheritFrom,
  fetchFareWithCb,
  fareToInheritFrom,
}: any) => {
  const { open, location } = useOpenModalByRoutes();
  console.log('la location', location);

  useEffect(() => {
    if (open === 'new') {
      //CREATE
      fetchFareLinesCustomersAndProducts();
      return setFareToCreateOrEdit(defaultValues);
    }
    // @ts-ignore
    if (open) {
      //EDIT
      return fetchFaresLinesFareCustomersAndProducts(open);
    }
    //CLOSE
    if (fareToForm !== null) fetchFareLines();
    return setFareToCreateOrEdit(null);
  }, [open]);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={fareLines}
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

const FaresComponentWithHistory = withRouter(FaresComponent);

export const Fares = connect(mapState, mapDispatch)(FaresComponentWithHistory);
