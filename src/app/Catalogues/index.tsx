import React from 'react';
import MainLayout from '../../layouts/Main';
import Select from '../../components/Select';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import operations from './duck/operations';
import { IFare } from '../Fares/duck/types/Fare';

const CataloguesComponent = ({ fares, setYear }: { fares: IFare[]; setYear: Function }) => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="md:w-1/3 xs:w-full">
        <Select
          options={fares}
          onChange={(el: any) => setYear(el.id)}
          value={null}
          labelText={t('Catalogo')}
          optionLabel={(opt: IFare) => opt.customer_name ?? ''}
          optionValue={(opt: IFare) => opt.customer_id ?? ''}
        />
      </div>
      <div className="md:w-1/3 xs:w-full">
        <Select
          options={fares}
          onChange={(el: any) => setYear(el.id)}
          value={null}
          labelText={t('Catalogo')}
          optionLabel={(opt: IFare) => opt.customer_name ?? ''}
          optionValue={(opt: IFare) => opt.customer_id ?? ''}
        />
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state: AppStoreInterface) => ({ fares: state.fares.data.fares });

const mapDispatchToProps = {
  ...operations,
};

export const Catalogues = connect(mapStateToProps, mapDispatchToProps)(CataloguesComponent);
