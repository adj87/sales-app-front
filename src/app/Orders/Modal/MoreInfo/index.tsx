import React, { useState } from 'react';
import Button from '../../../../components/Button';
import { useTranslation } from 'react-i18next';

const MoreInfo = () => {
  const { t } = useTranslation();

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const className = `${showInfo ? 'block' : 'hidden'}`;
  return (
    <>
      <p
        className="text-primary-light cursor-pointer border-b mt-5"
        onClick={() => setShowInfo(!showInfo)}
      >
        {t('commons.more-info')}
      </p>
      <div className={`border-b w-full border-primary-light p-5 ${className} flex justify-around`}>
        <Button
          color="primary"
          outline
          text={'orders.form.more-info.check-fare'}
          onClick={() => console.log('object')}
          size="sm"
        />
        <Button
          className="ml-3"
          color="primary"
          outline
          text={'orders.form.more-info.check-customer-info'}
          onClick={() => console.log('object')}
          size="sm"
        />
        <Button
          className="ml-3"
          color="primary"
          outline
          text={'orders.form.more-info.check-statistics'}
          onClick={() => console.log('object')}
          size="sm"
        />
      </div>
    </>
  );
};

export default MoreInfo;
