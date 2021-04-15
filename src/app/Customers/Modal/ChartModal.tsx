import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Modal from '../../../components/Modal/Modal';
import Table from '../../../components/Table';
import { columnsLastDataChart } from '../constants';
import { TitleSeparator } from '../../../components/TitleSeparator';
import { IChartUnitsByMonthProductAndCustomer, ICustomer } from '../duck/types/ICustomer';

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

  useEffect(() => {
    setHiddens(chartUnitsByMonthProductAndCustomer.products);
  }, [chartUnitsByMonthProductAndCustomer.products.length]);

  return (
    <Modal onCancel={() => onCancel()} onConfirm={() => onCancel()} size="lg" title={'Informes'}>
      {chartUnitsByMonthProductAndCustomer.data.length > 0 && (
        <>
          <TitleSeparator title="Evolución cantidades por producto" />
          <div className="w-full" style={{ height: '350px' }}>
            <ResponsiveContainer>
              <LineChart data={chartUnitsByMonthProductAndCustomer.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                {chartUnitsByMonthProductAndCustomer.products.map((el: string) => (
                  <Line type="monotone" dataKey={el} hide={Boolean(hiddens.find((act: string) => act === el))} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend products={chartUnitsByMonthProductAndCustomer.products} hiddens={hiddens} setHiddens={setHiddens} />
          <TitleSeparator title="Última compra de cada producto incluidos en tarifa" />
          <Table data={chartUnitsByMonthProductAndCustomer.last_data} tableName="chart-last-data" columns={columnsLastDataChart} withSearching />
        </>
      )}
    </Modal>
  );
};

const CustomLegend = ({ products, hiddens, setHiddens }: { products: string[]; hiddens: string[]; setHiddens: Function }) => {
  const height = products.length > 12 ? '450px' : '300px';
  return (
    <div className="flex flex-col flex-wrap w-full pl-8 overflow-x-auto" style={{ height }}>
      {products.map((product: any, index: any) => (
        <div
          className={`${
            Boolean(hiddens.find((el: string) => el === product)) ? 'text-grey-500 py-2' : 'text-primary-dark py-2'
          } cursor-pointer hover:text-primary-light`}
          key={`item-${index}`}
          style={{ width: '50%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          onClick={() => {
            const isAlreadyHidden = Boolean(hiddens.find((el: string) => el === product));
            let newHiddens = [...hiddens];
            if (isAlreadyHidden) {
              newHiddens = hiddens.filter((el) => el !== product);
            } else {
              newHiddens.push(product);
            }
            setHiddens(newHiddens);
          }}
        >
          {`${index + 1}-${product}`}
        </div>
      ))}
    </div>
  );
};
