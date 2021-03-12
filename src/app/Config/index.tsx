import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import MainLayout from '../../layouts/Main';
import Select from '../../components/Select';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { IConfig } from './duck/types/IConfig';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import operations from './duck/operations';

const ConfigComponent = ({ config, setYear }: { config: IConfig; setYear: Function }) => {
  const { t } = useTranslation();
  const options = useMemo(() => {
    const opts = [];
    const initialYear = parseInt(dayjs().format('YYYY'));
    for (let index = initialYear; index >= 2010; index--) {
      const element = { name: `Empresa ${index}`, id: index };
      opts.push(element);
    }
    return opts;
  }, []);

  return (
    <MainLayout>
      <div className="md:w-2/4 xs:w-full xl:w-1/4">
        <Select options={options} onChange={(el: any) => setYear(el.id)} value={config.year} labelText={t('config.year')} />
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state: AppStoreInterface) => ({ config: state.config });

const mapDispatchToProps = {
  ...operations,
};

export const Config = connect(mapStateToProps, mapDispatchToProps)(ConfigComponent);
