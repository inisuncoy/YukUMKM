import { NumberFormat } from '@/utils/numberFormat';
import moment from 'moment';
import React from 'react';

const Table = ({ financeDatas }) => {
  console.log(financeDatas);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tanggal
            </th>
            <th scope="col" className="px-6 py-3">
              Pemasukan
            </th>
            <th scope="col" className="px-6 py-3">
              Pengeluaran
            </th>
          </tr>
        </thead>
        <tbody>
          {financeDatas.length > 0 ? (
            financeDatas.map((data, i) => (
              <tr
                key={i}
                className={`bg-white border-b hover:bg-gray-50 ${
                  data.finance_type === 'INCOME'
                    ? 'text-[#6366F1]'
                    : 'text-[#FF3D00]'
                } `}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {moment(data.created_at).format('DD-MM-YYYY')}
                </th>
                <td className="px-6 py-4">
                  {NumberFormat(
                    data.finance_type === 'INCOME' ? data.balance : 0
                  )}
                </td>
                <td className="px-6 py-4">
                  {NumberFormat(
                    data.finance_type === 'EXPENSE' ? data.balance : 0
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b hover:bg-gray-50">
              <td
                colSpan="3" // Adjust according to the number of columns in your table
                className="px-6 py-4 font-medium text-center text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
