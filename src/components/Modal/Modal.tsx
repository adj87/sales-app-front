import React, { ReactNode } from 'react';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
import LayerOutOfRoot from './Layer';

export interface ModalProps {
  size?: 'md' | 'lg' | 'xs';

  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  title: string;
  centered?: boolean;
}

export default function Modal({
  size,
  onCancel,
  onConfirm,
  children,
  title,
  centered,
}: ModalProps) {
  const modalSize = (size: string = 'md') => {
    switch (size) {
      case 'lg':
        return 'md:w-800 w-full';
      case 'xs':
        return 'md:w-330 w-full';
      default:
        return 'md:w-500 w-full';
    }
  };
  const { t } = useTranslation();

  return (
    <LayerOutOfRoot>
      <div
        className={`${
          centered && 'h-full justify-center items-center flex '
        }relative w-auto py-6 mx-auto ${modalSize(size)} px-3`}
      >
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
          {!onConfirm && (
            <div className="flex items-center justify-between p-6 border-t border-solid border-grey-300 rounded-b">
              <div className="px-8 w-full">
                <Button
                  text={'commons.cancel'}
                  color="secondary"
                  outline
                  size="block"
                  onClick={onCancel}
                />
              </div>
              <div className="px-8 w-full">
                <Button
                  text={'commons.ok'}
                  color="secondary"
                  size="block"
                  style={{ transition: 'all .15s ease' }}
                  // @ts-ignore
                  onClick={onConfirm}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </LayerOutOfRoot>
  );
}
