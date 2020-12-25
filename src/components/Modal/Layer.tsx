import React, { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface LayerOutOfRootProps {
  children: React.ComponentType | ReactNode;
  className?: string;
}

const LayerOutOfRoot = ({ children, className }: LayerOutOfRootProps) => {
  const [modal, setModal] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const modal = document.createElement('div');
    modal.className =
      className ??
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

  return modal && ReactDOM.createPortal(children, modal);
};

export default LayerOutOfRoot;
