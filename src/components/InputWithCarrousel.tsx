import React, { useState } from 'react';
import Input from './Input';

interface InputWithCarrouselProps {
  click?: React.MouseEventHandler<HTMLInputElement>;
}

const InputWithCarrousel = () => {
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
          cerrar
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((el: number) => (
          <div className="bg-primary-dark h-32 w-32 m-4 transform hover:rotate-3 hover:scale-125 cursor-pointer transition duration-500"></div>
        ))}
      </div>
      <Input
        value="asa"
        label="asdads"
        name="asdads"
        onChange={() => console.log('asd')}
        onClick={() => setOpenCarrousel(true)}
      />
    </>
  );
};

export default InputWithCarrousel;
