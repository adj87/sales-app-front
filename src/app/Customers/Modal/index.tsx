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
import { TitleSeparator } from '../../../components/TitleSeparator';

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
      <TitleSeparator title="customers.form.separators.general" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <InputWithFV name="id" formikObject={formik} label="customers.table.id" onChange={setFieldValue} type="number" disabled />
        <div className="col-span-3">
          <InputWithFV name="name" formikObject={formik} label="customers.table.name" onChange={setFieldValue} />
        </div>
        <InputWithFV name="fiscal_id" formikObject={formik} label="customers.table.fiscal-id" onChange={setFieldValue} type="number" disabled />
        <InputWithFV
          name="method_of_payment"
          formikObject={formik}
          label="customers.table.method-of-payment"
          onChange={setFieldValue}
          type="number"
          disabled
        />
        <InputCheckboxWithFV
          name="is_deprecated"
          formikObject={formik}
          label={t('customers.table.is-deprecated')}
          style={{ marginTop: '40px' }}
          onChange={setFieldValue}
        />
        <InputCheckboxWithFV
          name="is_surcharge"
          formikObject={formik}
          label="customers.table.is-surcharge"
          onChange={setFieldValue}
          style={{ marginTop: '40px' }}
          type="number"
        />
        <InputCheckboxWithFV
          name="is_green_point"
          formikObject={formik}
          label={t('customers.table.is-green-point')}
          style={{ marginTop: '40px' }}
          onChange={setFieldValue}
        />
      </div>
      <TitleSeparator title="customers.form.separators.location" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <InputWithFV name="address" formikObject={formik} label="customers.table.address" onChange={setFieldValue} />
        </div>
        <InputWithFV name="town" formikObject={formik} label="customers.table.town" onChange={setFieldValue} />
        <InputWithFV name="province" formikObject={formik} label="customers.table.province" onChange={setFieldValue} />
        <InputWithFV name="zip_code" formikObject={formik} label="customers.table.zip-code" onChange={setFieldValue} />
        <InputWithFV name="route_id" formikObject={formik} label="customers.table.route-id" onChange={setFieldValue} />
      </div>
      <TitleSeparator title="customers.form.separators.contact" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputWithFV name="phone" formikObject={formik} label="customers.table.phone" onChange={setFieldValue} />
        <div className="col-span-2">
          <InputWithFV name="email" formikObject={formik} label="customers.table.email" onChange={setFieldValue} />
        </div>
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
