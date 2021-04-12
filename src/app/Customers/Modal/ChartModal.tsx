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
        <div className="w-full" style={{ height: '800px' }}>
          <TitleSeparator title="Evolución cantidades por producto" />
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={chartUnitsByMonthProductAndCustomer.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Legend
                // @ts-ignore
                onClick={(a: any) => {
                  const product = a.value;
                  const isAlreadyHidden = Boolean(hiddens.find((el: string) => el === product));
                  let newHiddens = [...hiddens];
                  if (isAlreadyHidden) {
                    newHiddens = hiddens.filter((el) => el !== product);
                  } else {
                    newHiddens.push(product);
                  }
                  setHiddens(newHiddens);
                }}
              />
              {chartUnitsByMonthProductAndCustomer.products.map((el: string) => (
                <Line type="monotone" dataKey={el} hide={Boolean(hiddens.find((act: string) => act === el))} />
              ))}
            </LineChart>
          </ResponsiveContainer>
          <TitleSeparator title="Última compra de cada producto incluidos en tarifa" />
          <Table data={chartUnitsByMonthProductAndCustomer.last_data} tableName="chart-last-data" columns={columnsLastDataChart} withSearching />
        </div>
      )}
    </Modal>
  );
};
