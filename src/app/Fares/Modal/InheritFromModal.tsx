import React, { useState } from 'react';
import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import { IFare } from '../duck/types/Fare';

interface InheritFromModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: Function;
  fareToInheritFrom: IFare;
  fetchFareWithCb: Function;
  customers: ICustomer[];
}

const InheritFromModal = ({
  onCancel,
  onConfirm,
  fareToInheritFrom,
  customers,
  fetchFareWithCb,
}: InheritFromModalProps) => {
  const [fare, setFare] = useState<IFare | null>(fareToInheritFrom);

  return (
    <Modal size="xs" centered onCancel={onCancel} onConfirm={() => onConfirm(fare)}>
      <SelectComponent
        onChange={(customer: ICustomer) =>
          fetchFareWithCb(customer.id, (res: any) => setFare(res.data))
        }
        options={customers}
        labelText="fares.form.inherit-from-another-customer-label"
        value={fare ? { name: fare.customer_name, id: fare.customer_id } : null}
      />
    </Modal>
  );
};

export default InheritFromModal;
