import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import Modal from '../../../components/Modal/Modal';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { IChartUnitsByMonthProductAndCustomer, ICustomer, IPaymentMethod, IRoute } from '../duck/types/ICustomer';
import { AppStoreInterface } from '../../../store/AppStoreInterface';
import operations from '../duck/operations';
import { connect } from 'react-redux';
import { TitleSeparator } from '../../../components/TitleSeparator';
import SelectComponent from '../../../components/Select';
import { validationSchema } from '../constants';
import Button from '../../../components/Button';
import { ChartModal } from './ChartModal';

const InputWithFV = withFormikValues(Input);
const InputCheckboxWithFV = withFormikValues(InputCheckBox);
const SelectComponentWithFV = withFormikValues(SelectComponent);

interface CustomerModalProps {
  onCancel: Function;
  fetchChartUnitsByProductMonthAndCustomer: Function;
  customer: ICustomer | null;
  onSubmit: Function;
  paymentMethods: IPaymentMethod[];
  routes: IRoute[];
  chartUnitsByMonthProductAndCustomer: IChartUnitsByMonthProductAndCustomer;
  resetCharts: Function;
}

const CustomerModal = ({
  onCancel,
  customer,
  onSubmit,
  paymentMethods,
  routes,
  fetchChartUnitsByProductMonthAndCustomer,
  chartUnitsByMonthProductAndCustomer,
  resetCharts,
}: CustomerModalProps) => {
  const { t } = useTranslation();
  const [chartModalOpen, setChartModalOpen] = useState<boolean>(false);
  const formik = useFormik<ICustomer>({
    // @ts-ignore
    initialValues: customer,
    onSubmit: (c: ICustomer) => {
      onSubmit(c);
    },
    validationSchema: validationSchema,
  });
  const { values, setFieldValue, submitForm } = formik;
  return (
    <Modal onCancel={() => onCancel()} onConfirm={submitForm} size="lg" title={values?.id ? 'customers.form.title-edit' : 'customers.form.title'}>
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
        <div className="col-span-2">
          <InputWithFV name="agent_id" formikObject={formik} label="customers.table.agent-id" onChange={setFieldValue} />
        </div>
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
        <InputWithFV name="phone_2" formikObject={formik} label="customers.table.phone-2" onChange={setFieldValue} />
        <InputWithFV name="phone_mobile" formikObject={formik} label="customers.table.phone-mobile" onChange={setFieldValue} />
        <div className="col-span-2">
          <InputWithFV name="email" formikObject={formik} label="customers.table.email" onChange={setFieldValue} />
        </div>
      </div>
      <Button color="secondary" onClick={() => setChartModalOpen(true)} text="Abrir" />
      {chartModalOpen && (
        <ChartModal
          // @ts-ignore
          customer={customer}
          chartUnitsByMonthProductAndCustomer={chartUnitsByMonthProductAndCustomer}
          onCancel={() => {
            resetCharts();
            setChartModalOpen(false);
          }}
          fetchChartUnitsByProductMonthAndCustomer={fetchChartUnitsByProductMonthAndCustomer}
        />
      )}
    </Modal>
  );
};
const mapState = (state: AppStoreInterface) => ({
  chartUnitsByMonthProductAndCustomer: state.customers.chartUnitsByMonthProductAndCustomer,
});

const mapDispatch = {
  resetCharts: operations.resetCharts,
  fetchChartUnitsByProductMonthAndCustomer: operations.fetchChartUnitsByProductMonthAndCustomer,
};

export default connect(mapState, mapDispatch)(CustomerModal);
