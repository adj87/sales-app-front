import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Modal from '../../../components/Modal/Modal';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { ICustomer, IPaymentMethod, IRoute } from '../duck/types/ICustomer';
import { AppStoreInterface } from '../../../store/AppStoreInterface';
import operations from '../duck/operations';
import { connect } from 'react-redux';
import { TitleSeparator } from '../../../components/TitleSeparator';
import SelectComponent from '../../../components/Select';
import { validationSchema } from '../constants';

const InputWithFV = withFormikValues(Input);
const InputCheckboxWithFV = withFormikValues(InputCheckBox);
const SelectComponentWithFV = withFormikValues(SelectComponent);

interface ProductModalProps {
  removeElementToCreateOrEdit: Function;
  customer: ICustomer | null;
  editCustomer: Function;
  createCustomer: Function;
  paymentMethods: IPaymentMethod[];
  routes: IRoute[];
}

const CustomerModal = ({ removeElementToCreateOrEdit, customer, editCustomer, createCustomer, paymentMethods, routes }: ProductModalProps) => {
  const { t } = useTranslation();
  const formik = useFormik<ICustomer>({
    // @ts-ignore
    initialValues: customer,
    onSubmit: (c: ICustomer) => {
      debugger;
      if (c.id) {
        editCustomer(c, removeElementToCreateOrEdit);
      } else {
        createCustomer(c, removeElementToCreateOrEdit);
      }
    },
    validationSchema: validationSchema,
  });
  const { values, setFieldValue, submitForm } = formik;
  return (
    <Modal
      onCancel={() => removeElementToCreateOrEdit()}
      onConfirm={submitForm}
      size="lg"
      title={values?.id ? 'customers.form.title-edit' : 'customers.form.title'}
    >
      <TitleSeparator title="customers.form.separators.general" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <InputWithFV name="id" formikObject={formik} label="customers.table.id" onChange={setFieldValue} disabled />
        <div className="col-span-3">
          <InputWithFV name="name" formikObject={formik} label="customers.table.name" onChange={setFieldValue} />
        </div>
        <InputWithFV name="fiscal_id" formikObject={formik} label="customers.table.fiscal-id" onChange={setFieldValue} />
        <div className="col-span-2">
          <SelectComponentWithFV
            name="method_of_payment"
            formikObject={formik}
            labelText="customers.table.method-of-payment"
            onChange={(name: string, value: IPaymentMethod) => setFieldValue(name, value.id)}
            options={paymentMethods}
          />
        </div>
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
        <SelectComponentWithFV
          name="route_id"
          formikObject={formik}
          labelText="customers.table.route-id"
          onChange={(name: string, value: IRoute) => setFieldValue(name, value.id)}
          options={routes}
        />
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
  routes: state.customers.routes,
  paymentMethods: state.customers.paymentMethods,
});

const mapDispatch = {
  editCustomer: operations.editCustomer,
  createCustomer: operations.createCustomer,
  removeElementToCreateOrEdit: operations.removeElementToCreateOrEdit,
};

export default connect(mapState, mapDispatch)(CustomerModal);
