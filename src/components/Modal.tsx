import React, { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  size?: 'md' | 'lg';
  open: boolean;
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

export default function Modal({ size, open, onCancel, onConfirm, children }: ModalProps) {
  const modalSize = size === 'lg' ? 'max-w-5xl' : 'max-w-3xl';
  return open ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className={`relative w-auto my-6 mx-auto ${modalSize} px-2`}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-grey-300 rounded-t">
              <h2 className="text-2xl text-primary-dark text-center font-semibold">Modal Title</h2>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span
                  className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
                  onClick={onCancel}
                >
                  ×
                </span>
              </button>
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
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-primary-light"></div>
    </>
  ) : null;
}
