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
  const { submitForm, setValues, values, errors } = useFormik<IFare>({
    onSubmit: (values: IFare) => {
      // @ts-ignore
      const fareLines = values.fare_lines.filter((fl: IFareLineWithCheck) => fl.checked);
      onConfirm({ ...values, fare_lines: fareLines });
    },
    initialValues: defaultValues,
    validationSchema: validationSchemaInheritFrom,
  });

  return (
    <Modal size="xs" centered onCancel={onCancel} onConfirm={submitForm}>
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
