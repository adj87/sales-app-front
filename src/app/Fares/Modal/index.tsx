import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import { IProduct } from '../../Products/duck/types/Product';
import { IFare, IFareLine } from '../duck/types/Fare';
import Table from '../../../components/Table';
import { columns, defaultValuesFareLine } from '../constants';
import Button from '../../../components/Button';
import InheritFromModal from './InheritFromModal';
import { useTranslation } from 'react-i18next';
import FareLineModal from './FareLineModal';

interface FaresModalProps {
  onCancel: Function;
  customers: ICustomer[];
  products: IProduct[];
  fare: IFare;
  fareLines: IFareLine[];
  fares: IFare[];
  setFareToInheritFrom: Function;
  fetchFareWithCb: Function;
  fareToInheritFrom: IFare;
}

const FaresModal = ({
  onCancel,
  fare,
  fares,
  customers,
  setFareToInheritFrom,
  fareToInheritFrom,
  fetchFareWithCb,
  fareLines,
  products,
}: FaresModalProps) => {
  const { values, setFieldValue } = useFormik<IFare>({
    initialValues: fare,
    onSubmit: (values: IFare) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { t } = useTranslation();
  const [idCustomersAlreadyWithFares, setIdCustomersAlreadyWithFares] = useState<number[] | null>(
    null,
  );
  const [idProductsAlreadyInFareLines, setIdProductsAlreadyInFareLines] = useState<number[] | null>(
    null,
  );
  const [inheritModal, setInheritModal] = useState<boolean>(false);
  const [fareLineToForm, setFareLineToForm] = useState<IFareLine | null>(null);
  const isEditingMode = Boolean(fare.customer_id);
  // @ts-ignore

  useEffect(() => {
    // @ts-ignore
    const idProductsAlreadyInFareLines = values.fare_lines.map(
      (fareLine: IFareLine) => fareLine.product_id,
    );
    setIdProductsAlreadyInFareLines(idProductsAlreadyInFareLines);
  }, [values.fare_lines]);
  useEffect(() => {
    const idCustomersAlreadyWithFares = fares.map((fare: IFare) => fare.customer_id);
    // @ts-ignore
    setIdCustomersAlreadyWithFares(idCustomersAlreadyWithFares);
  }, [fares.length]);

  return (
    <>
      <Modal
        title={`${isEditingMode ? 'fares.form.title-edit' : 'fares.form.title'}`}
        onConfirm={() => console.log('holasd')}
        onCancel={() => {
          setFareToInheritFrom(null);
          onCancel();
        }}
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
              isDisabled={isEditingMode}
              isOptionDisabled={(customer: ICustomer) =>
                // @ts-ignore
                idCustomersAlreadyWithFares.includes(customer.id)
              }
            />
          </div>
        </div>
        <div className="mt-5">
          <Table
            data={values.fare_lines}
            columns={columns}
            tableName={'fares'}
            onAddButton={() => setFareLineToForm(defaultValuesFareLine)}
            onRowClick={({ original }: any) => {
              const fareLine: IFareLine = original;
              setFareLineToForm(fareLine);
            }}
          />
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
          fareLines={fareLines}
          fetchFareWithCb={fetchFareWithCb}
          fareToInheritFrom={fareToInheritFrom}
        />
      )}
      {Boolean(fareLineToForm) && (
        <FareLineModal
          onCancel={() => setFareLineToForm(null)}
          onConfirm={(fareLine: IFareLine, isNew: boolean) => {
            if (isNew) {
              fareLine.customer_id = values.customer_id;
              fareLine.customer_name = values.customer_name;
              let newFareLines = [...values.fare_lines];
              newFareLines.push(fareLine);
              setFieldValue('fare_lines', newFareLines);
            } else {
              // @ts-ignore
              const newFareLines = values.fare_lines.map((el: IFareLine) => {
                if (el.product_id === fareLine.product_id) return fareLine;
                return el;
              });
              setFieldValue('fare_lines', newFareLines);
            }
            //close modal
            setFareLineToForm(null);
          }}
          // @ts-ignore
          fareLine={fareLineToForm}
          isProductAlreadyInFare={(product: IProduct) =>
            // @ts-ignore
            idProductsAlreadyInFareLines.includes(product.id)
          }
          products={products}
        />
      )}
    </>
  );
};

export default FaresModal;
