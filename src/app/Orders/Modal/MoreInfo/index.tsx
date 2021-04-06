import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Button';
import { useTranslation } from 'react-i18next';
import FaresModal from '../../../Fares/Modal';
import { AppStoreInterface } from '../../../../store/AppStoreInterface';
import { operations } from '../../duck';
import { IFare, IFareLine } from '../../../Fares/duck/types/Fare';
import { ICustomer, IPaymentMethod, IRoute } from '../../../Customers/duck/types/ICustomer';
import { IProduct } from '../../../Products/duck/types/Product';
import { defaultValues as defaultEmptyFare } from '../../../Fares/constants';
import { isDefaultFare } from '../../../../utils';
import CustomerModal from '../../../Customers/Modal';

interface MoreInfoProps {
  fare: null | IFare;
  customers: ICustomer[];
  products: IProduct[];
  fares: IFare[];
  fareToInheritFrom: IFare;
  fetchFareWithCb: Function;
  customer: ICustomer;
  onFareModalConfirm: Function;
  paymentMethods: IPaymentMethod[];
  routes: IRoute[];
  editCustomer: Function;
  onCustomerModalConfirm: Function;
  fetchFares: Function;
}

const MoreInfo = ({
  fare,
  customers,
  products,
  fetchFares,
  fetchFareWithCb,
  fares,
  customer,
  onFareModalConfirm,
  routes,
  paymentMethods,
  editCustomer,
  onCustomerModalConfirm,
}: MoreInfoProps) => {
  const { t } = useTranslation();

  const [modalInfoToOpen, setModalInfoToOpen] = useState<'fare' | 'customer' | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const className = `${showInfo ? 'block' : 'hidden'}`;
  // @ts-ignore

  const getFare = (fare: IFare, customer: ICustomer, customers: ICustomer[]) => {
    if (isDefaultFare(fare)) {
      let emptyFare: IFare = { ...defaultEmptyFare };
      emptyFare.customer_id = customer ? customer.id : null;
      emptyFare.customer_name = customer ? customer.name : null;
      return emptyFare;
    }
    return fare;
  };

  return (
    <>
      <p className="text-primary-light cursor-pointer border-b mt-5" onClick={() => setShowInfo(!showInfo)}>
        {t('commons.more-info')}
      </p>
      <div className={`border-b w-full border-primary-light p-5 ${className} flex justify-around`}>
        <Button color="primary" outline text={'orders.form.more-info.check-fare'} onClick={() => setModalInfoToOpen('fare')} size="sm" />
        <Button
          className="ml-3"
          color="primary"
          outline
          text={'orders.form.more-info.check-customer-info'}
          onClick={() => setModalInfoToOpen('customer')}
          size="sm"
        />
        <Button
          className="ml-3"
          color="primary"
          outline
          text={'orders.form.more-info.check-statistics'}
          onClick={() => console.log('object')}
          size="sm"
        />
      </div>
      {modalInfoToOpen === 'fare' && Boolean(fare) && (
        // @ts-ignore
        <FaresModal
          customers={customers}
          products={products}
          // @ts-ignore
          fare={getFare(fare, customer, customers)}
          fares={fares}
          onCancel={() => setModalInfoToOpen(null)}
          fetchFareWithCb={fetchFareWithCb}
          editingMode={!isDefaultFare(fare)}
          selectDisabled
          onConfirm={(fare: IFare, isCreating: boolean) => {
            setModalInfoToOpen(null);
            onFareModalConfirm(fare, isCreating);
          }}
          fetchFares={fetchFares}
        />
      )}

      {modalInfoToOpen === 'customer' && Boolean(customer) && (
        <CustomerModal
          // @ts-ignore
          customer={customer}
          routes={routes}
          paymentMethods={paymentMethods}
          onSubmit={(c: ICustomer) => {
            editCustomer(c, () => {
              onCustomerModalConfirm(c);
              setModalInfoToOpen(null);
            });
          }}
          onCancel={() => setModalInfoToOpen(null)}
        />
      )}
    </>
  );
};

const mapState = (state: AppStoreInterface) => ({
  orders: state.orders.data,
  fare: state.orders.fare,
  fareToInheritFrom: state.orders.fareToInheritFrom,
  products: state.products.data,
  customers: state.customers.data,
  fares: state.fares.data.fares,
  routes: state.customers.routes,
  paymentMethods: state.customers.paymentMethods,
});

const mapDispatch = {
  ...operations,
};

//@ts-ignore
export default connect(mapState, mapDispatch)(MoreInfo);
