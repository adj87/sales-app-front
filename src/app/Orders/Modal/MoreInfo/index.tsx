import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../components/Button';
import { useTranslation } from 'react-i18next';
import FaresModal from '../../../Fares/Modal';
import { AppStoreInterface } from '../../../../store/AppStoreInterface';
import { operations } from '../../duck';
import { IFare, IFareLine } from '../../../Fares/duck/types/Fare';
import { ICustomer } from '../../../Customers/duck/types/Customer';
import { IProduct } from '../../../Products/duck/types/Product';
import { defaultValues as defaultEmptyFare } from '../../../Fares/constants';
import { hasOwnFare } from '../../../../utils';

interface MoreInfoProps {
  fare: null | IFare;
  customers: ICustomer[];
  products: IProduct[];
  fares: IFare[];
  fareToInheritFrom: IFare;
  fetchFareWithCb: Function;
  customerId: number;
  onFareModalConfirm: Function;
}

const MoreInfo = ({ fare, customers, products, fareToInheritFrom, fetchFareWithCb, fares, customerId, onFareModalConfirm }: MoreInfoProps) => {
  const { t } = useTranslation();

  const [modalInfoToOpen, setModalInfoToOpen] = useState<'fare' | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const className = `${showInfo ? 'block' : 'hidden'}`;
  // @ts-ignore

  const getFare = (fare: IFare, customerId: number, customers: ICustomer[]) => {
    if (!hasOwnFare(fare)) {
      const customer = customers.find((el: ICustomer) => el.id === customerId);
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
          onClick={() => console.log('object')}
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
          fare={getFare(fare, customerId, customers)}
          fares={fares}
          fareToInheritFrom={fareToInheritFrom}
          onCancel={() => setModalInfoToOpen(null)}
          fetchFareWithCb={fetchFareWithCb}
          editingMode={hasOwnFare(fare)}
          selectDisabled
          onConfirm={(fare: IFare, isCreating: boolean) => {
            setModalInfoToOpen(null);
            onFareModalConfirm(fare, isCreating);
          }}
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
});

const mapDispatch = {
  ...operations,
};

//@ts-ignore
export default connect(mapState, mapDispatch)(MoreInfo);
