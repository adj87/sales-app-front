import React, { useState } from 'react';
import Input from './Input';
import { useTranslation } from 'react-i18next';

interface InputWithCarrouselProps {
  click?: React.MouseEventHandler<HTMLInputElement>;
}

const InputWithCarrousel = () => {
  const { t } = useTranslation();
  const [openCarrousel, setOpenCarrousel] = useState(false);
  const display = openCarrousel ? 'block' : 'hidden';
  return (
    <>
      <div
        className={`fixed w-full h-full bg-grey-900 top-0 left-0 ${display} bg-opacity-20 flex flex-row justify-between p-4 flex-wrap items-start content-start`}
      >
        <button
          onClick={() => setOpenCarrousel(false)}
          className="absolute top-0 right-0 text-white"
        >
          {t('commons.close')}
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((el: number) => (
          <div className="bg-primary-dark h-32 w-32 m-4 transform hover:rotate-3 hover:scale-125 cursor-pointer transition duration-500">
            <img src="https://picsum.photos/200/200" className="rounded-lg shadow-lg" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex items-center justify-center">
        <div className="col-span-2">
          <Input value="asa" label="asdads" name="asdads" onChange={() => console.log('asd')} />
        </div>

        <div className="hover:scale-125 cursor-pointer transition duration-500">
          <img
            src="https://picsum.photos/150/150"
            className="rounded-lg shadow-lg"
            onClick={() => setOpenCarrousel(true)}
          />
        </div>
      </div>
    </>
  );
};

export default InputWithCarrousel;
