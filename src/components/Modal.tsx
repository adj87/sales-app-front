import React, { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import { useTranslation } from 'react-i18next';

export interface ModalProps {
  size?: 'md' | 'lg';

  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  title: string;
}

export default function Modal({ size, onCancel, onConfirm, children, title }: ModalProps) {
  const modalSize = size === 'lg' ? 'md:w-800 w-full' : 'md:w-500 w-full';
  const { t } = useTranslation();
  const [modal, setModal] = useState<any>(null);

  useEffect(() => {
    const modal = document.createElement('div');
    modal.className =
      'modalclass overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-blur-lg bg-primary-opacity transition duration-500';
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

  // @ts-ignore

  return (
    modal &&
    ReactDOM.createPortal(
      <>
        <div className={`relative w-auto my-6 mx-auto ${modalSize} px-3`}>
          {/*content*/}
          <div className="border-0 rounded-xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/*header*/}
            <div className="p-5  rounded-t">
              <h2 className="text-2xl text-primary-dark text-center font-semibold uppercase font-bold">
                {t(title)}
              </h2>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 text-3xl leading-none font-semibold outline-none focus:outline-none absolute right-0"></button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">{children}</div>
            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-grey-300 rounded-b">
              <div className="px-8 w-full">
                <Button
                  text={'cancelar'}
                  color="secondary"
                  outline
                  size="block"
                  onClick={onCancel}
                />
              </div>
              <div className="px-8 w-full">
                <Button
                  text={'aceptar'}
                  color="secondary"
                  size="block"
                  style={{ transition: 'all .15s ease' }}
                  onClick={onConfirm}
                />
              </div>
            </div>
          </div>
        </div>
      </>,
      // @ts-ignore
      modal,
    )
  );
}
