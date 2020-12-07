import React, { useEffect } from 'react';
import Modal from '../../../../components/Modal';
import { ModalProps } from '../../../../components/Modal';
import InputWithCarrousel from '../../../../components/InputWithCarrousel';
import Input from '../../../../components/Input';
import { IProduct } from '../../../Products/duck/types/Product';

interface ProductModalProps extends ModalProps {
  children?: undefined;
  products: IProduct[];
  fetchProducts: Function;
}

const ProductModal = ({
  onCancel,
  onConfirm,
  open,
  title,
  products,
  fetchProducts,
}: ProductModalProps) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Modal onCancel={onCancel} onConfirm={onConfirm} open={open} title={title} size="md">
      <InputWithCarrousel label="orders.form.products-form.label-product" data={products} />
      <div className="grid grid-cols-3 gap-4 mt-2">
        <Input
          value="asd"
          label="orders.form.products-form.label-quantity"
          name="quantity"
          type="number"
          onChange={() => console.log('hola')}
        />
        <Input
          value="asd"
          label="orders.form.products-form.label-promotion"
          name="promotion"
          type="number"
          onChange={() => console.log('hola')}
        />
        <Input value="asd" label="Precio" name="price" onChange={() => console.log('hola')} />
      </div>
    </Modal>
  );
};

export default ProductModal;
