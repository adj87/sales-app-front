import React from 'react';
import { useFormik } from 'formik';

import Modal from '../../../components/Modal/Modal';

import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { useTranslation } from 'react-i18next';
import { ICustomer } from '../duck/types/ICustomer';
import { AppStoreInterface } from '../../../store/AppStoreInterface';
import operations from '../duck/operations';
import { connect } from 'react-redux';

const InputWithFV = withFormikValues(Input);
const InputCheckboxWithFV = withFormikValues(InputCheckBox);

interface ProductModalProps {
  removeElementToCreateOrEdit: Function;
  customer: ICustomer | null;
  editCustomer: Function;
}

const CustomerModal = ({ removeElementToCreateOrEdit, customer, editCustomer }: ProductModalProps) => {
  const { t } = useTranslation();
  const formik = useFormik<ICustomer>({
    // @ts-ignore
    initialValues: customer,
    onSubmit: (c: ICustomer) => {
      editCustomer(c, removeElementToCreateOrEdit);
    },
    // validationSchema: validationSchema,
  });
  const { values, setFieldValue, setValues, errors, submitForm, submitCount } = formik;
  return (
    <Modal onCancel={() => removeElementToCreateOrEdit()} onConfirm={submitForm} size="lg" title={'products.form.title-edit'}>
      <h1 className="text-2xl text-secondary-light mb-2 mt-5">{t('commons.bottle-details')}</h1>
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
      </div>
    </Modal>
  );
};
const mapState = (state: AppStoreInterface) => ({
  customer: state.customers.elementToCreateOrEdit,
});

const mapDispatch = {
  editCustomer: operations.editCustomer,
  removeElementToCreateOrEdit: operations.removeElementToCreateOrEdit,
};

export default connect(mapState, mapDispatch)(CustomerModal);
