import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import { IFare, IFareLine } from '../duck/types/Fare';
import { fareLinesToFares } from '../constants';

interface InheritFromModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: Function;
  fareToInheritFrom: IFare;
  fetchFareWithCb: Function;
  fares: IFare[];
}

const InheritFromModal = ({
  onCancel,
  onConfirm,
  fareToInheritFrom,
  fares,
  fetchFareWithCb,
}: InheritFromModalProps) => {
  const [fare, setFare] = useState<IFare | null>(fareToInheritFrom);

  return (
    <Modal size="xs" centered onCancel={onCancel} onConfirm={() => onConfirm(fare)}>
      <SelectComponent
        onChange={(fare: IFare) =>
          fetchFareWithCb(fare.customer_id, (res: any) => setFare(res.data))
        }
        // @ts-ignore
        options={fares}
        // @ts-ignore
        optionLabel={(fare: IFare) => fare.customer_name}
        // @ts-ignore
        optionValue={(fare: IFare) => fare.customer_id.toString()}
        labelText="fares.form.inherit-from-another-customer-label"
        value={fare}
      />
    </Modal>
  );
};

export default InheritFromModal;
