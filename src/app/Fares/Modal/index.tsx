import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import InputRadio from '../../../components/Inputs/InputRadio';
import LabelAndAmount from '../../../components/LabelAndAmount';
import { IProduct } from '../../Products/duck/types/Product';
import { IOrder } from '../../Orders/duck/types/Order';
import { IFare, IFareLine } from '../duck/types/Fare';
import Table from '../../../components/Table';
import { columns } from '../constants';
import Button from '../../../components/Button';
import { api } from '../duck';
import InheritFromModal from './InheritFromModal';
import { useTranslation } from 'react-i18next';

interface FaresModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customers: ICustomer[];
  products: IProduct[];
  fare: IFare;
  fares: IFareLine[];
  setFareToInheritFrom: Function;
  fetchFareWithCb: Function;
  fareToInheritFrom: IFare;
}

const FaresModal = ({
  onCancel,
  fare,
  customers,
  setFareToInheritFrom,
  fareToInheritFrom,
  fetchFareWithCb,
}: FaresModalProps) => {
  const { values, setFieldValue } = useFormik<IFare>({
    initialValues: fare,
    onSubmit: (values: IFare) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { t } = useTranslation();
  const [inheritModal, setInheritModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        title="fares.form.title"
        onConfirm={() => console.log('holasd')}
        onCancel={onCancel}
        size="lg"
      >
        <div className="flex justify-center">
          <div className="w-1/2">
            <SelectComponent
              value={{ name: values.customer_name, id: values.customer_id }}
              labelText={'fares.form.label-customer'}
              onChange={(customer: ICustomer) => {
                setFieldValue('customer_name', customer.name);
                //setFieldValue('customer_id', customer.id);
              }}
              options={customers}
            />
          </div>
        </div>
        <div className="mt-5">
          <Table data={values.fare_lines} columns={columns} tableName={'fares'} />
          <Button
            text={`${
              fareToInheritFrom
                ? `${t('fares.form.inheriting-from-customer-button')} ${
                    fareToInheritFrom.customer_name
                  }`
                : 'fares.form.inherit-from-another-customer-button'
            }`}
            color="primary"
            onClick={() => setInheritModal(true)}
            size="sm"
          />
        </div>
      </Modal>
      {inheritModal && (
        <InheritFromModal
          onCancel={() => setInheritModal(false)}
          onConfirm={(fare: IFare) => {
            setFieldValue('fare_lines', fare.fare_lines);
            setInheritModal(false);
            setFareToInheritFrom(fare);
          }}
          customers={customers}
          fetchFareWithCb={fetchFareWithCb}
          fareToInheritFrom={fareToInheritFrom}
        />
      )}
    </>
  );
};

export default FaresModal;
