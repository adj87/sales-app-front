import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { IProduct } from '../app/Products/duck/types/Product';
import Button from './Button';
import { DEFAULT_IMAGE_URL } from '../constants';
import LayerOutOfRoot from './Modal/Layer';

interface InputWithCarrouselProps {
  data: any[];
  onChange: Function;
  value?: any;
}

const back_host = process.env.REACT_APP_BACK_HOST;

const InputWithCarrousel = ({ data, onChange, value }: InputWithCarrouselProps) => {
  const [openCarrousel, setOpenCarrousel] = useState(false);
  const [showInMiddle, setShowInMiddle] = useState<IProduct | null>(null);
  return (
    <>
      {openCarrousel && (
        <LayerOutOfRoot>
          <h1 className="text-white text-center text-6xl mb-8">Productos</h1>
          <div className="flex flex-row justify-center p-4 flex-wrap items-start content-start">
            <button onClick={() => setOpenCarrousel(false)} className="absolute top-0 right-0 text-white p-4 cursor-pointer">
              {'X'}
            </button>
            {data.map((el: any) => {
              const normalClass = 'h-36 w-40 m-4 transform hover:rotate-3  cursor-pointer transition duration-100 bg-white rounded-lg ';
              const selectedClass =
                'h-36 w-40 m-4 transform scale-125 rotate-3  cursor-pointer transition  bg-white rounded-lg border-8 border-primary-dark z-50';
              return (
                <div className="flex flex-col">
                  <div className={el.id === value ? selectedClass : normalClass}>
                    <FontAwesomeIcon
                      inverse
                      icon={faFileAlt}
                      size="lg"
                      className="text-primary-dark absolute top-0"
                      style={{ right: '2px', top: '2px' }}
                      onClick={() => setShowInMiddle(el)}
                    />
                    <img
                      src={`${back_host}/images/${el.id}.png`}
                      className="rounded-lg shadow-lg"
                      width="auto"
                      onClick={() => {
                        onChange(el);
                        setOpenCarrousel(false);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </LayerOutOfRoot>
      )}

      <div className="flex justify-center items-center flex-col mb-5 mt-2 w-4/5 m-auto">
        <img src={`${value ? `${back_host}/images/${value}.png` : `${DEFAULT_IMAGE_URL}`} `} width="80" onClick={() => setOpenCarrousel(true)} />

        <div className="w-full"></div>
      </div>
      {showInMiddle !== null && (
        <ProductDetail
          product={showInMiddle}
          onClose={() => setShowInMiddle(null)}
          onAdd={() => {
            onChange(showInMiddle);
            setShowInMiddle(null);
            setOpenCarrousel(false);
          }}
        />
      )}
    </>
  );
};

interface ProductDetailProps {
  product: IProduct;
  onClose: Function;
  onAdd: Function;
}

const ProductDetail = ({ product, onClose, onAdd }: ProductDetailProps) => {
  const { t } = useTranslation();
  const Line = ({ label, title }: { label: string; title: string }) => {
    return (
      <div className="flex flex-row justify-between py-2">
        <span className="text-grey-900  ">{t(label)}</span>
        <span className="text-grey-500">{title}</span>
      </div>
    );
  };
  return (
    <LayerOutOfRoot className="modalclass fixed w-full h-full z-50 top-0 left-0 bg-white">
      <div className="flex w-full lg:w-2/3 justify-center items-center m-auto" style={{ height: '90%' }}>
        <div className="flex-1 flex justify-center">
          <img className="w-full lg:w-2/3 mt-10" src={`${back_host}/images/${product?.id}.png`} />
        </div>
        <div className="flex-1 flex flex-col p-5">
          <p className="text-bold text-primary-dark text-center p-5 uppercase font-bold text-xl">{product.name}</p>
          <div className="px-10 xl:px-20">
            <p className="text-center text-primary-main uppercase font-bold">{t('commons.bottle-details')}</p>
            <Line label="commons.bar-code" title={'848958965841'} />
            <Line label="commons.capacity" title={product.capacity.toString()} />
            <Line label="commons.weight" title={product.capacity.toString()} />
            <p className="text-center text-primary-main pt-5 uppercase font-bold">{t('commons.box-details')}</p>
            <Line label="commons.units-per-box" title={product.units_per_box.toString()} />
            <Line label="commons.capacity" title={product.capacity.toString()} />
            <Line label="commons.width" title={product.capacity.toString()} />
            <Line label="commons.length" title={product.capacity.toString()} />
            <Line label="commons.height" title={product.capacity.toString()} />
            <p className="text-center text-primary-main pt-5 uppercase font-bold">{t('commons.pallet-details')}</p>
            <Line label="commons.units-per-pallet" title={product.capacity.toString()} />
            <Line label="commons.base" title={product.capacity.toString()} />
            <Line label="commons.capacity" title={product.capacity.toString()} />
            <Line label="commons.height" title={product.capacity.toString()} />
            <Line label="commons.weight" title={product.capacity.toString()} />
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

export default InputWithCarrousel;
