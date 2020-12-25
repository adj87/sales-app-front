import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Input from './Inputs/InputText';
import { useTranslation } from 'react-i18next';
import SelectComponent from './Select';
import { IProduct } from '../app/Products/duck/types/Product';
import Button from './Button';

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
  return (
    <>
      <div className={`fixed w-full  bg-grey-900 top-0 left-0 ${display} bg-opacity-20  z-50`}>
        <h1 className="text-white text-center text-6xl mb-8">Productos</h1>
        <div className="flex flex-row justify-center p-4 flex-wrap items-start content-start">
          <button
            onClick={() => setOpenCarrousel(false)}
            className="absolute top-0 right-0 text-white p-4 cursor-pointer"
          >
            {'X'}
          </button>
          {data.map((el: any) => {
            const normalClass =
              'h-36 w-40 m-4 transform hover:rotate-3 hover:scale-125 cursor-pointer transition duration-100 bg-white rounded-lg ';
            const selectedClass =
              'h-36 w-40 m-4 transform scale-150 cursor-pointer transition  bg-white rounded-lg border-8 border-primary-light z-20';
            return (
              <div className={el.id === value.id ? selectedClass : normalClass}>
                <img
                  src={`${back_host}/images/${el.id}.png`}
                  className="rounded-lg shadow-lg"
                  width="auto"
                  onClick={() => setShowInMiddle(el)}
                />
                <p className="text-center text-primary-main text-sm">{el.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex items-center justify-center">
        <div className={`${value.id ? 'col-span-2' : 'col-span-4'}`}>
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
      {showInMiddle !== null && (
        <Layer>
          <div
            className="flex w-full lg:w-1/2 justify-center items-center m-auto"
            style={{ height: '90%' }}
          >
            <div className="flex-1">
              <img
                className="w-full lg:w-5/6"
                src={`${back_host}/images/${showInMiddle.id}.png`}
                // className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1">Hola que tal</div>
          </div>
          <div className="flex justify-center">
            <Button text="commons.add" color="primary" onClick={() => console.log('hola')}></Button>
          </div>
          <div
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={() => setShowInMiddle(null)}
          >
            X
          </div>
        </Layer>
      )}
    </>
  );
};

const Layer = ({ children }: any) => {
  const [modal, setModal] = useState<any>(null);
  useEffect(() => {
    const modal = document.createElement('div');
    modal.className = 'modalclass fixed w-full h-full z-50 top-0 left-0 bg-white';
    // @ts-ignore
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    setModal(modal);
    return () => {
      const numberOfModalsOpen = document.getElementsByClassName('modalclass').length;
      if (numberOfModalsOpen === 1) document.body.style.overflow = 'unset';
      document.body.removeChild(modal);
    };
  }, []);

  return modal && ReactDOM.createPortal(children, modal);
};

export default InputWithCarrousel;
