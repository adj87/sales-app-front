import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Modal from '../../../components/Modal/Modal';
import Table from '../../../components/Table';
import { columnsLastDataChart } from '../constants';
import { TitleSeparator } from '../../../components/TitleSeparator';
import { IChartUnitsByMonthProductAndCustomer, ICustomer, IProductAndItsColor } from '../duck/types/ICustomer';
import Button from '../../../components/Button';
import { useTranslation } from 'react-i18next';

interface ChartModalProps {
  onCancel: Function;
  fetchChartUnitsByProductMonthAndCustomer: Function;
  customer: ICustomer;
  chartUnitsByMonthProductAndCustomer: IChartUnitsByMonthProductAndCustomer;
}

export const ChartModal = ({
  onCancel,
  customer,
  fetchChartUnitsByProductMonthAndCustomer,
  chartUnitsByMonthProductAndCustomer,
}: ChartModalProps) => {
  useEffect(() => {
    fetchChartUnitsByProductMonthAndCustomer(customer.id);
  }, []);

  const [hiddens, setHiddens] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setHiddens(chartUnitsByMonthProductAndCustomer.products.map((pr: IProductAndItsColor) => pr.name));
  }, [chartUnitsByMonthProductAndCustomer.products.length]);

  return (
    <Modal onCancel={() => onCancel()} onConfirm={() => onCancel()} size="lg" title={t('customers.form.charts-first.title')}>
      <>
        {chartUnitsByMonthProductAndCustomer.data.length > 0 && (
          <>
            <p className="text-grey-500 text-bold text-2x1 text-center mb-12">{customer.name}</p>
            <TitleSeparator title="customers.form.charts-first.separator-1" />
            <div className="w-full" style={{ height: '350px' }}>
              <ResponsiveContainer>
                <LineChart data={chartUnitsByMonthProductAndCustomer.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  {chartUnitsByMonthProductAndCustomer.products.map((p: IProductAndItsColor) => (
                    <Line type="monotone" stroke={p.color} dataKey={p.name} hide={Boolean(hiddens.find((act: string) => act === p.name))} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend products={chartUnitsByMonthProductAndCustomer.products} hiddens={hiddens} setHiddens={setHiddens} />
          </>
        )}
        {chartUnitsByMonthProductAndCustomer.last_data.length > 0 && (
          <>
            <TitleSeparator title={'customers.form.charts-first.separator-2'} />
            <Table data={chartUnitsByMonthProductAndCustomer.last_data} tableName="chart-last-data" columns={columnsLastDataChart} withSearching />
          </>
        )}
      </>
    </Modal>
  );
};

const CustomLegend = ({ products, hiddens, setHiddens }: { products: IProductAndItsColor[]; hiddens: string[]; setHiddens: Function }) => {
  const { t } = useTranslation();
  const height = products.length > 12 ? '450px' : '300px';
  return (
    <div className="flex flex-col flex-wrap w-full pl-8 overflow-x-auto" style={{ height }}>
      {products.map((product: IProductAndItsColor, index: any) => {
        const isHidden = Boolean(hiddens.find((el: string) => el === product.name));
        return (
          <div
            className={`cursor-pointer hover:text-primary-light py-2`}
            key={`item-${index}`}
            style={{ width: '50%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: isHidden ? 'grey' : product.color }}
            onClick={() => {
              const isAlreadyHidden = Boolean(hiddens.find((el: string) => el === product.name));
              let newHiddens = [...hiddens];
              if (isAlreadyHidden) {
                newHiddens = hiddens.filter((el) => el !== product.name);
              } else {
                newHiddens.push(product.name);
              }
              setHiddens(newHiddens);
            }}
          >
            {`${index + 1}-${product.name}`}
          </div>
        );
      })}
      <div className="flex flex-row justify-around">
        <Button
          onClick={() => setHiddens(products.map((el: IProductAndItsColor) => el.name))}
          text={t('commons.deactivate-all')}
          color={'primary'}
          size={'sm'}
          className="mb-2 py-0 mt-2"
        />
        <Button onClick={() => setHiddens([])} text={t('commons.activate-all')} color={'primary'} size={'sm'} className="mb-2 py-0 mt-2" />
      </div>
    </div>
  );
};