import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../app/Products/duck/types/Product';
import { LogisticSheet } from '../components/LogisticSheet';
import { DEFAULT_IMAGE_URL } from '../constants';
import LayerOutOfRoot from './Modal/Layer';
import { getPhpBackHostUrl } from '../utils';

interface InputWithCarrouselProps {
  data: any[];
  onChange: Function;
  value?: any;
}

const backEnd = process.env.REACT_APP_BACK;
const backHost = process.env.REACT_APP_BACK_HOST;
const imgUrl = (id: string) => (backEnd == 'NODE' ? `${backHost}/images/${id}.png` : `${getPhpBackHostUrl()}/images?id=${id}`);

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
              const normalClass = 'h-36 w-40 m-4 transform hover:scale-125  cursor-pointer transition duration-100 bg-white rounded-lg ';
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
                      src={`${imgUrl(el.id)}`}
                      className="rounded-lg shadow-lg"
                      width="auto"
                      onClick={() => {
                        onChange(el);
                        setOpenCarrousel(false);
                      }}
                      title={el.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </LayerOutOfRoot>
      )}

      <div className="flex  items-center flex-col mt-10 w-3/5 m-auto cursor-pointer">
        <img src={`${value ? `${imgUrl(value)}` : `${DEFAULT_IMAGE_URL}`} `} width="70%" onClick={() => setOpenCarrousel(true)} />

        <div className="w-full"></div>
      </div>
      {showInMiddle !== null && (
        <LogisticSheet
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

export default InputWithCarrousel;
