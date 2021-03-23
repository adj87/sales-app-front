import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { IFare, IFareLine, IFareLineWithCheck } from '../duck/types/Fare';
import { defaultValues, validationSchemaFare, validationSchemaInheritFrom } from '../constants';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import LabelError from '../../../components/LabelError';

interface InheritFromModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: Function;
  fareToInheritFrom: IFare;
  fetchFareWithCb: Function;
  fares: IFare[];
}

const InheritFromModal = ({ onCancel, onConfirm, fareToInheritFrom, fares, fetchFareWithCb }: InheritFromModalProps) => {
  const [inheritPrices, setInheritPrices] = useState({
    price_1: true,
    price_2: false,
    price_3: false,
    price_4: false,
  });
  const { submitForm, setValues, values, errors } = useFormik<IFare>({
    onSubmit: (values: IFare) => {
      // @ts-ignore
      let fareLines: IFareLine[] = values.fare_lines.filter((fl: IFareLineWithCheck) => fl.checked);
      fareLines = fareLines.map((el: IFareLine) => {
        return {
          ...el,
          price_1: inheritPrices.price_1 ? el.price_1 : 0,
          price_2: inheritPrices.price_2 ? el.price_2 : 0,
          price_3: inheritPrices.price_3 ? el.price_3 : 0,
          price_4: inheritPrices.price_4 ? el.price_4 : 0,
          to_sell: 1, // reset to_sell and to_charge to 1
          to_charge: 1,
        };
      });
      onConfirm({ ...values, fare_lines: fareLines });
    },
    initialValues: defaultValues,
    validationSchema: validationSchemaInheritFrom,
  });

  const onChangeInheritPrice = (name: string, checked: boolean) => setInheritPrices((oldState) => ({ ...oldState, [name]: checked }));

  return (
    <Modal centered onCancel={onCancel} onConfirm={submitForm}>
      <div className="w-full sticky top-0 bg-white z-10 pb-10 border-b border-grey-400">
        <SelectComponent
          onChange={(name: string, fare: IFare) =>
            fetchFareWithCb(fare.customer_id, (res: any) => {
              const newFareLines = res.data.fare_lines.map((fl: IFareLine) => ({
                ...fl,
                checked: true,
              }));
              const fare = { ...res.data, fare_lines: newFareLines };
              setValues(fare);
            })
          }
          // @ts-ignore
          options={fares}
          // @ts-ignore
          optionLabel={(fare: IFare) => fare.customer_name}
          // @ts-ignore
          optionValue={(fare: IFare) => fare.customer_id}
          labelText="fares.form.inherit-from-another-customer-label"
          value={values && values.customer_id}
          name="inherit_from"
        />
        {values.customer_id && (
          <div className="divide divide-y divide-grey-400 md:divide-y-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <InputCheckBox value={inheritPrices.price_1} label={'commons.price-1'} onChange={onChangeInheritPrice} name={'price_1'} />
              <InputCheckBox value={inheritPrices.price_2} label={'commons.price-2'} onChange={onChangeInheritPrice} name={'price_2'} />
              <InputCheckBox value={inheritPrices.price_3} label={'commons.price-3'} onChange={onChangeInheritPrice} name={'price_3'} />
              <InputCheckBox value={inheritPrices.price_4} label={'commons.price-4'} onChange={onChangeInheritPrice} name={'price_4'} />
            </div>
          </div>
        )}
      </div>
      {
        //@ts-ignore
        values.fare_lines.map((el: IFareLineWithCheck) => (
          <p className="pt-3">
            <InputCheckBox
              label={`${el.product_name} - ${el.price_1}`}
              value={el.checked}
              name={el.product_id?.toString() ?? ''}
              key={`inherit-from-${el.product_id}`}
              onChange={(id: string, checked: boolean) => {
                // @ts-ignore
                const newFareLines = values.fare_lines.map((fLine: IFareLineWithCheck) => {
                  // @ts-ignore
                  if (fLine.product_id === id) {
                    return { ...fLine, checked };
                  } else {
                    return { ...fLine };
                  }
                });

                setValues({ ...values, fare_lines: newFareLines });
              }}
            />
          </p>
        ))
      }
      {<LabelError error={errors.fare_lines} className="mt-5 ml-3" />}
    </Modal>
  );
};

export default InheritFromModal;
