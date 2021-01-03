import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import InputRadio from '../../../components/Inputs/InputRadio';
import LabelAndAmount from '../../../components/LabelAndAmount';
import { IProduct } from '../../Products/duck/types/Product';
import { IOrder } from '../../Orders/duck/types/Order';
import { IFare } from '../duck/types/Fare';

interface FaresModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customers: ICustomer[];
  products: IProduct[];
  fare: IFare;
  fares: IFare[];
}

const FaresModal = ({ onCancel }: FaresModalProps) => {
  return (
    <Modal title="HOla" onConfirm={() => console.log('holasd')} onCancel={onCancel}>
      Halloo
    </Modal>
  );
};

export default FaresModal;
