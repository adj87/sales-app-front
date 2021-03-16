import React from 'react';
import { useTranslation } from 'react-i18next';
import { IProduct } from '../app/Products/duck/types/Product';
import { getPhpBackHostUrl } from '../utils';
import Button from './Button';
import LayerOutOfRoot from './Modal/Layer';

const backEnd = process.env.REACT_APP_BACK;
const backHost = process.env.REACT_APP_BACK_HOST;

interface ProductDetailProps {
  product: IProduct;
  onClose: Function;
  onAdd: Function;
}

export const LogisticSheet = ({ product, onClose, onAdd }: ProductDetailProps) => {
  const { t } = useTranslation();
  const Line = ({ label, title }: { label: string; title: string | number }) => {
    return (
      <div className="flex flex-row justify-between py-2">
        <span className="text-grey-900  ">{t(label)}</span>
        <span className="text-grey-500">{title}</span>
      </div>
    );
  };

  const imgUrl = (id: string) => (backEnd == 'NODE' ? `${backHost}/images/${id}.png` : `${getPhpBackHostUrl()}/images?id=${id}`);
  return (
    <LayerOutOfRoot className="modalclass fixed w-full h-full z-50 top-0 left-0 bg-white">
      <div className="flex w-full lg:w-2/3 justify-center items-center m-auto" style={{ height: '90%' }}>
        <div className="flex-1 flex justify-center">
          <img className="w-full lg:w-2/3 mt-10" src={`${imgUrl(product.id)}`} />
        </div>
        <div className="flex-1 flex flex-col p-5">
          <p className="text-bold text-primary-dark text-center p-5 uppercase font-bold text-xl">{product.name}</p>
          <div className="px-10 xl:px-20">
            <p className="text-center text-primary-main uppercase font-bold">{t('commons.bottle-details')}</p>
            <Line label="commons.bar-code" title={product.code_bar} />
            <Line label="commons.capacity" title={product.capacity} />
            <Line label="commons.weight" title={product.weight} />
            <p className="text-center text-primary-main pt-5 uppercase font-bold">{t('commons.box-details')}</p>
            <Line label="commons.units-per-box" title={product.units_per_box} />
            <Line label="commons.capacity" title={product.box_capacity} />
            <Line label="commons.weight" title={product.box_weight} />
            <Line label="commons.length" title={product.box_length} />
            <Line label="commons.width" title={product.box_width} />
            <Line label="commons.height" title={product.box_height} />
            <p className="text-center text-primary-main pt-5 uppercase font-bold">{t('commons.pallet-details')}</p>
            <Line label="commons.units-per-pallet" title={product.pallet_boxes} />
            <Line label="commons.base" title={product.pallet_base} />
            <Line label="commons.capacity" title={product.pallet_capacity} />
            <Line label="commons.height" title={product.pallet_height} />
            <Line label="commons.weight" title={product.pallet_weight} />
          </div>
        </div>
      </div>
      <div className="flex justify-around w-1/2 lg:w-1/5 m-auto">
        <Button text="commons.cancel" color="secondary" onClick={() => onClose()} outline></Button>
        <Button text="commons.add" color="secondary" onClick={() => onAdd()}></Button>
      </div>
      <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={() => onClose()}>
        X
      </div>
    </LayerOutOfRoot>
  );
};
