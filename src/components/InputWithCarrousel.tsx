import React, { useState } from 'react';
import Input from './Input';
import { useTranslation } from 'react-i18next';
import SelectComponent from './Select';
import { IProduct } from '../app/Products/duck/types/Product';

interface InputWithCarrouselProps {
  click?: React.MouseEventHandler<HTMLInputElement>;
  label: string;
  data: any[];
  onChange: Function;
  value?: any;
}

const back_host = process.env.REACT_APP_BACK_HOST;

const InputWithCarrousel = ({ label, data, onChange, value }: InputWithCarrouselProps) => {
  const { t } = useTranslation();
  const [openCarrousel, setOpenCarrousel] = useState(false);
  const display = openCarrousel ? 'block' : 'hidden';
  const [showInMiddle, setShowInMiddle] = useState<IProduct | null>(null);
  console.log('showInMiddle', showInMiddle);
  return (
    <>
      <div
        className={`fixed w-full  bg-grey-900 top-0 left-0 ${display} bg-opacity-20 flex flex-row justify-center p-4 flex-wrap items-start content-start z-50`}
      >
        <h1 className="text-white">Catálogo</h1>
        <button
          onClick={() => setOpenCarrousel(false)}
          className="absolute top-0 right-0 text-white"
        >
          {t('commons.close')}
        </button>
        {data.map((el: any) => {
          const normalClass =
            'h-36 w-40 m-4 transform hover:rotate-3 hover:scale-125 cursor-pointer transition duration-100 bg-white rounded-lg ';
          const selectedClass =
            'h-36 w-40 m-4 transform scale-125 cursor-pointer transition  bg-white rounded-lg border-8 border-primary-light';
          return (
            <div className={el.id === value.id ? selectedClass : normalClass}>
              <img
                src={`${back_host}/images/${el.id}.png`}
                className="rounded-lg shadow-lg"
                width="auto"
                onDoubleClick={() => {
                  console.log('yeah marakuye');
                  setOpenCarrousel(false);
                  onChange(el);
                }}
              />
              <p className="text-center text-primary-main text-sm">{el.name}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex items-center justify-center">
        <div className="col-span-2">
          <SelectComponent options={data} onChange={onChange} labelText={label} value={value} />
        </div>

        <div className="hover:scale-125 cursor-pointer transition duration-500 flex justify-center items-center">
          <img
            src={`${back_host}/images/${value.id}.png`}
            width="80"
            onClick={() => setOpenCarrousel(true)}
          />
        </div>
      </div>
      {/*       {showInMiddle !== null && (
        <div className="absolute z-50 inset-x-1/2 h-screen w-screen top-0 left-0 bg-grey-900">
          <div
            className="w-1/3 fixed h-screen margin-auto"
            style={{
              backgroundImage: `url(${back_host}/images/${showInMiddle.id}.png)`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      )} */}
    </>
  );
};

export default InputWithCarrousel;
