import React from 'react';
import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { IFareLine } from '../duck/types/Fare';
import { IProduct } from '../../Products/duck/types/Product';
import { useFormik } from 'formik';
import Input from '../../../components/Inputs/InputText';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { validationSchemaFareLine } from '../constants';
import useTranslateFormErrors from '../../../i18n/useTranslateFormErrors';
import i18n from '../../../i18n';

const InputWithFV = withFormikValues(Input);
const SelectWithFV = withFormikValues(SelectComponent);

interface FareLineModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: Function;
  fareLine: IFareLine;
  products: IProduct[];
  isProductAlreadyInFare: (option: any) => boolean;
}

const FareLineModal = ({ onCancel, onConfirm, products, fareLine, isProductAlreadyInFare }: FareLineModalProps) => {
  const isNewFareLine = !fareLine.product_id;
  const formik = useFormik<IFareLine>({
    initialValues: fareLine,
    onSubmit: (values: IFareLine) => {
      onConfirm(values, isNewFareLine);
    },
    validationSchema: validationSchemaFareLine,
  });
  const { setFieldValue, submitForm } = formik;
  useTranslateFormErrors(formik);
  return (
    <Modal
      size="xs"
      centered
      onCancel={onCancel}
      onConfirm={submitForm}
      title={`${isNewFareLine ? 'fares.form-fare-line.title' : 'fares.form-fare-line.title-edit'}`}
    >
      <div className="pt-5">
        <SelectWithFV
          onChange={(name: string, product: IProduct) => {
            setFieldValue('product_name', product.name);
            setFieldValue('product_id', product.id);
          }}
          options={products}
          labelText="fares.form-fare-line.label-product"
          formikObject={formik}
          isOptionDisabled={isProductAlreadyInFare}
          isDisabled={!isNewFareLine}
          name="product_id"
        />
      </div>
      <div className="pt-5">
        <InputWithFV name="price_1" label="fares.form-fare-line.label-price-1" onChange={setFieldValue} formikObject={formik} />
      </div>
      <div className="pt-5">
        <InputWithFV name="price_2" label="fares.form-fare-line.label-price-2" onChange={setFieldValue} formikObject={formik} />
      </div>
      <div className="pt-5">
        <InputWithFV name="price_3" label="fares.form-fare-line.label-price-3" onChange={setFieldValue} formikObject={formik} />
      </div>
      <div className="pt-5">
        <InputWithFV name="price_4" label="fares.form-fare-line.label-price-4" onChange={setFieldValue} formikObject={formik} />
      </div>
      <div className="pt-5">
        <InputWithFV name="price_5" label="fares.form-fare-line.label-price-5" onChange={setFieldValue} formikObject={formik} />
      </div>
      <div className="pt-5">
        <InputWithFV name="price_6" label="fares.form-fare-line.label-price-6" onChange={setFieldValue} formikObject={formik} />
      </div>
    </Modal>
  );
};

export default FareLineModal;
