import React, { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Modal from '../../../components/Modal/Modal';
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

  console.log(chartUnitsByMonthProductAndCustomer.data);
  return (
    <Modal onCancel={() => onCancel()} onConfirm={() => onCancel()} size="lg" title={'customers.form.title-edit'}>
      {chartUnitsByMonthProductAndCustomer.data.length > 0 && (
        <div className="w-full" style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
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
              <Legend />
              {chartUnitsByMonthProductAndCustomer.products.map((el: string) => (
                <Line type="monotone" dataKey={el} onClick={() => console.log('object')} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Modal>
  );
};
