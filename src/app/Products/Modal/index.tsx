import React from 'react';
import { useFormik } from 'formik';

import Modal from '../../../components/Modal/Modal';

import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import { IProduct } from '../duck/types/Product';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { useTranslation } from 'react-i18next';
import { validationSchema } from '../constants';

const InputWithFV = withFormikValues(Input);
const InputCheckboxWithFV = withFormikValues(InputCheckBox);

interface ProductModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  product: IProduct;
  editProduct: Function;
}

const ProductModal = ({ onCancel, product, editProduct }: ProductModalProps) => {
  const { t } = useTranslation();
  const formik = useFormik<IProduct>({
    initialValues: product,
    onSubmit: (ord: IProduct) => {
      editProduct(ord);

      // @ts-ignore
      return onCancel();
    },
    validationSchema: validationSchema,
  });
  const { values, setFieldValue, setValues, errors, submitForm, submitCount } = formik;
  return (
    <Modal onCancel={onCancel} onConfirm={submitForm} size="lg" title={'products.form.title-edit'}>
      <h1 className="text-2xl text-secondary-light mb-2 mt-5">{t('commons.bottle-details')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithFV name="name" formikObject={formik} label="products.table.name" onChange={setFieldValue} />
        <InputWithFV name="code_bar" formikObject={formik} label="products.table.code-bar" onChange={setFieldValue} disabled />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputWithFV name="green_point_amount" formikObject={formik} label="products.table.green-point-amount" onChange={setFieldValue} />
        <InputWithFV name="capacity" formikObject={formik} label="products.table.capacity" onChange={setFieldValue} />
        <InputWithFV name="weight" formikObject={formik} label="products.table.weight" onChange={setFieldValue} />
      </div>
      <div className="flex justify-end">
        <InputCheckboxWithFV name="is_deprecated" formikObject={formik} label={t('products.table.is-deprecated')} onChange={setFieldValue} />
      </div>
      <h1 className="text-2xl text-secondary-light mb-2 mt-10">{t('commons.box-details')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <InputWithFV name="box_width" formikObject={formik} label="products.table.box-width" onChange={setFieldValue} type="number" />
        <InputWithFV name="box_height" formikObject={formik} label="products.table.box-capacity" onChange={setFieldValue} type="number" />
        <InputWithFV name="box_length" formikObject={formik} label="products.table.box-length" onChange={setFieldValue} type="number" />
        <InputWithFV name="box_weight" formikObject={formik} label="products.table.box-weight" onChange={setFieldValue} type="number" />
        <InputWithFV name="box_capacity" formikObject={formik} label="products.table.box-capacity" onChange={setFieldValue} type="number" />
      </div>
      <h1 className="text-2xl text-secondary-light mb-2 mt-10">{t('commons.pallet-details')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <InputWithFV name="pallet_boxes" formikObject={formik} label="products.table.pallet-boxes" onChange={setFieldValue} type="number" />
        <InputWithFV name="pallet_base" formikObject={formik} label="products.table.pallet-base" onChange={setFieldValue} type="number" />
        <InputWithFV
          name="pallet_weight"
          formikObject={formik}
          label="products.table.pallet-weight"
          onChange={setFieldValue}
          type="number"
          disabled
        />
        <InputWithFV
          name="pallet_capacity"
          formikObject={formik}
          label="products.table.pallet-capacity"
          onChange={setFieldValue}
          type="number"
          disabled
        />
        <InputWithFV
          name="pallet_height"
          formikObject={formik}
          label="products.table.pallet-height"
          onChange={setFieldValue}
          type="number"
          disabled
        />
      </div>

      {/*    <InputWithFV label="products.form.label-shipping-place" name="shipping_place" onChange={setFieldValue} formikObject={formik} />

        <InputWithFV label="products.form.label-delivery-date" name="delivery_date" onChange={setFieldValue} formikObject={formik} type="date" /> */}
    </Modal>
  );
};

export default ProductModal;
