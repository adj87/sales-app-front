import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';

import Modal from '../../../components/Modal/Modal';
import { roundToTwoDec } from '../../../utils';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/ICustomer';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import InputRadio from '../../../components/Inputs/InputRadio';
import OrderLinesTable from './OrderLinesTable';
import { IOrder, IOrderLine } from '../duck/types/Order';
import LabelAndAmount from '../../../components/LabelAndAmount';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { IFare, IFareLine } from '../../Fares/duck/types/Fare';
import { IProduct } from '../../Products/duck/types/Product';
import MoreInfo from './MoreInfo';
import { operations } from '../duck';
import { AppStoreInterface } from '../../../store/AppStoreInterface';
import useDidUpdateEffect from '../../../hooks/useDidUpdateEffect';
import { validationSchemaOrder, calculateTotals, transformLinesIfDefaultFare } from '../constants';
import LabelError from '../../../components/LabelError';
import { DeliveryDaysRemaining } from './DeliveryDaysRemaining';
import { useTranslation } from 'react-i18next';
import { dayjsCustom } from '../../../dayjsConfig';

const dateFormatFront = process.env.REACT_APP_FORMAT_DATE_FRONT;

const InputWithFV = withFormikValues(Input);
const InputRadioWithFV = withFormikValues(InputRadio);
const InputCheckBoxWithFV = withFormikValues(InputCheckBox);
const SelectComponentWithFV = withFormikValues(SelectComponent);

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customers: ICustomer[];
  customer: ICustomer;
  products: IProduct[];
  order: IOrder;
  fare: IFare;
  createFare: Function;
  editFare: Function;
  fetchFare: Function;
  createOrder: Function;
  editOrder: Function;
  fetchCustomer: Function;
}

const OrdersModal = ({
  onCancel,
  customers,
  order,
  products,
  createFare,
  fetchFare,
  fare,
  createOrder,
  editOrder,
  editFare,
  fetchCustomer,
  customer,
}: OrdersModalProps) => {
  const [totalGreenPoint, setTotalGreenPoint] = useState<number>(0);
  const formik = useFormik<IOrder>({
    initialValues: order,
    onSubmit: (ord: IOrder) => {
      if (!ord.id) {
        createOrder(ord);
      } else {
        editOrder(ord, order.type);
      }
      // @ts-ignore
      return onCancel();
    },
    validationSchema: validationSchemaOrder,
  });
  const { t } = useTranslation();
  const { values, setFieldValue, setValues, errors, submitForm, submitCount } = formik;

  useEffect(() => {
    if (values.id) {
      fetchCustomer(values.customer_id);
      const { total_green_point } = calculateTotals(values, products);
      setTotalGreenPoint(total_green_point);
    }
  }, []);

  useDidUpdateEffect(() => {
    setPricesToNewFareAndSetTotals(values, setValues, fare, products);
  }, [fare?.customer_id]);

  useDidUpdateEffect(() => {
    const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(values, products);
    setTotalGreenPoint(total_green_point);
    let order_lines = [...values.order_lines].map((el: IOrderLine) => ({ ...el, order_type: values.type }));
    setValues({ ...values, total_net, total, total_taxes, total_surcharge, order_lines });
  }, [values?.type, values.is_surcharge, values.is_green_point]);

  return (
    <Modal onCancel={onCancel} onConfirm={submitForm} size="lg" title={`${values.id ? 'orders.form.title-edit' : 'orders.form.title'}`}>
      <div className="w-full flex justify-between border-grey-400 border-b pb-4 -mt-5">
        <div>
          <span className="text-primary-dark">{t('orders.form.label-date')}</span>
          <span className="text-grey-500 ml-4">{dayjsCustom(values.date).format(dateFormatFront)}</span>
        </div>
        {values.id && (
          <div>
            <span className="text-primary-dark">{t('orders.form.label-number')}</span>
            <span className="text-grey-500 ml-4">{`${values.type}/${values.id}`}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-grey-100 border-b py-4">
        <div className="col-span-2">
          <SelectComponentWithFV
            name="customer_id"
            formikObject={formik}
            options={customers}
            labelText="orders.form.label-customer"
            onChange={(input_name: string, customer: ICustomer) => {
              // prettier-ignore
              const { address, fiscal_id, zip_code, id: customer_id, name: customer_name, is_surcharge, is_green_point, route_id, province, town } = customer;
              // prettier-ignore
              setValues({ ...values, address, fiscal_id, shipping_place: address, customer_id, customer_name, zip_code, is_surcharge, is_green_point, route_id, province, town });
              fetchFare(customer_id);
              fetchCustomer(customer_id);
            }}
          />
        </div>
        <div>
          <InputWithFV label="orders.form.label-delivery-date" name="delivery_date" onChange={setFieldValue} formikObject={formik} type="date" />
          <DeliveryDaysRemaining deliveryDate={values.delivery_date ?? undefined} date={values.date ?? undefined} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 py-2">
        <div className="col-span-2">
          <InputWithFV label="orders.form.label-shipping-place" name="shipping_place" onChange={setFieldValue} formikObject={formik} />
        </div>
        <div className="col-span-1">
          <InputRadioWithFV
            label="orders.form.label-type"
            name="type"
            onChange={(field: string, value: string) => {
              const is_surcharge = value === 'B' ? false : values.is_surcharge;
              const newValues = { ...values, [field]: value, is_surcharge };
              setValues(newValues);
            }}
            formikObject={formik}
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
            ]}
          />
        </div>
        <div className="col-span-3 flex flex-row items-end mb-5 justify-between mt-10">
          <InputCheckBoxWithFV formikObject={formik} label={'orders.form.label-green-point'} name="is_green_point" onChange={setFieldValue} />
          <InputCheckBoxWithFV formikObject={formik} label={'orders.form.label-surcharge'} name="is_surcharge" onChange={setFieldValue} />
          <InputCheckBoxWithFV formikObject={formik} label={'orders.form.label-together'} name="show_together_with_others" onChange={setFieldValue} />
        </div>
      </div>

      <div className="w-full pt-2 mb-5">
        <OrderLinesTable
          values={values}
          onConfirmOrderLineModal={(orderLine: IOrderLine, isDefaultPrice: boolean) => {
            const { order_lines } = values;
            const orderLineToEdit = order_lines.find((el: IOrderLine) => el.line_number === orderLine.line_number);
            let newOrderLines = [...order_lines];
            //EDITING
            if (orderLineToEdit) {
              newOrderLines = order_lines.map((el: IOrderLine) => {
                if (el.line_number === orderLine.line_number) return orderLine;
                return el;
              });

              //CREATING
            } else {
              const orderLines: IOrderLine[] = transformLinesIfDefaultFare([orderLine], fare, isDefaultPrice);
              orderLines.forEach((el: IOrderLine) => {
                newOrderLines.push({
                  ...el,
                  line_number: newOrderLines.length + 1,
                  order_id: values.id,
                  order_type: values.type,
                });
              });
            }

            let newValues = { ...values, order_lines: newOrderLines };
            const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(newValues, products);
            newValues = { ...newValues, total, total_net, total_taxes, total_surcharge };
            setValues(newValues);
            setTotalGreenPoint(total_green_point);
          }}
          deleteOnRowPress={(row: any) => {
            const rowToDelete: IOrderLine = row.original;
            const newOrderLines = [...values.order_lines].filter((el: IOrderLine) => el.line_number !== rowToDelete.line_number);
            let newValues = { ...values, order_lines: newOrderLines };
            const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(newValues, products);
            newValues = { ...newValues, total, total_net, total_taxes, total_surcharge };
            setValues(newValues);
            setTotalGreenPoint(total_green_point);
          }}
        />
        <LabelError error={submitCount > 0 && errors.order_lines} className="text-center" />
      </div>
      {values.order_lines.length > 0 && (
        <div className="flex justify-end mt-5">
          <div className="w-4/6 px-2">
            <div className="flex flex-row justify-start items-end mb-4">
              <label className="text-primary-dark text-lg font-bold">{t('orders.form.label-total-boxes')}</label>
              <label className="text-secondary-dark font-bold ml-4 text-lg">
                {/* @ts-ignore */}
                {values.order_lines.reduce((acc: any, el: IOrderLine) => (acc += parseInt(el.quantity)), 0)}
              </label>
            </div>
            {customer && customer.is_green_point != values.is_green_point && <LabelError error={t('orders.form.something-wrong-with-gp')} />}
            {customer && customer.is_surcharge != values.is_surcharge && (
              <LabelError className="mt-5" error={t('orders.form.something-wrong-with-surcharge')} />
            )}
          </div>
          <div className="w-2/6 flex flex-col mt-6">
            <LabelAndAmount amount={roundToTwoDec(values.total_net)} label={'Base'} />
            <LabelAndAmount amount={roundToTwoDec(values.total_taxes)} label={'Iva'} isDisabled={values.type === 'B'} />
            <LabelAndAmount amount={roundToTwoDec(values.total_surcharge)} label={'Recargo'} isDisabled={!values.is_surcharge} />
            <LabelAndAmount amount={roundToTwoDec(totalGreenPoint)} label={'P. Verde'} isDisabled={!values.is_green_point} />
            <LabelAndAmount amount={roundToTwoDec(values.total)} label={'Total'} isTotal />
          </div>
        </div>
      )}
      {values?.customer_id && (
        <MoreInfo
          customer={customer}
          onFareModalConfirm={(fare: IFare, isCreating: boolean) => {
            if (isCreating) return createFare(fare, (newFare: IFare) => setPricesToNewFareAndSetTotals(values, setValues, newFare, products));
            return editFare(fare, (newFare: IFare) => {
              setPricesToNewFareAndSetTotals(values, setValues, newFare, products);
            });
          }}
          onCustomerModalConfirm={(c: ICustomer) => {
            debugger;
            fetchCustomer(c.id);
            // prettier-ignore
            const { address, fiscal_id, zip_code, id: customer_id, name: customer_name, is_surcharge, is_green_point, route_id, province, town } = c;
            // prettier-ignore
            setValues({ ...values, address, fiscal_id, shipping_place: address, customer_id, customer_name, zip_code, is_surcharge, is_green_point, route_id, province, town });
          }}
        />
      )}
    </Modal>
  );
};

const setPricesToNewFareAndSetTotals = (values: IOrder, setValues: any, fare: IFare, products: IProduct[]) => {
  const getPriceFromFare = (ol: IOrderLine, fare: IFare) => fare.fare_lines.find((fl: IFareLine) => fl.product_id === ol.product_id)?.price_1 || 0;

  const newOrderLines = values.order_lines.map((ol: IOrderLine) => {
    const price = getPriceFromFare(ol, fare);
    const green_point_amount = values.is_green_point ? products.find((pr: IProduct) => pr.id === ol.product_id)?.green_point_amount ?? 0 : 0;
    return {
      ...ol,
      price,
      green_point_amount,
    };
  });

  let newValues = { ...values, order_lines: newOrderLines };

  const { total, total_net, total_taxes, total_surcharge } = calculateTotals(newValues, products);

  newValues = { ...newValues, total_net, total, total_taxes, total_surcharge };
  setValues(newValues);
};

const mapState = (state: AppStoreInterface) => ({
  customers: state.customers.data,
  products: state.products.data,
  orders: state.orders.data,
  customer: state.orders.customer,
  fare: state.orders.fare,
});

const mapDispatch = {
  ...operations,
};

//@ts-ignore
export default connect(mapState, mapDispatch)(OrdersModal);
