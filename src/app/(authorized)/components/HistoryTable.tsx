import React from 'react';
import { columns, earnings } from '../_constant';
import Image from 'next/image';

type NullDataType = {
    nullImg: string,
    noData: string
}

export const HistoryTable = ({nullImg, noData} : NullDataType) => {
  return (
    <div className="rounded-[32px] mt-10">
      <h1 className="text-[1.5rem] font-bold mb-6">Earnings History</h1>
      <div className="rounded-3xl overflow-hidden bg-white h-[323px]">
        <table className={`${earnings.length > 0 ? "" : "h-full"} w-full`}>
          <thead>
            <tr className="border-b border-b-[#E5E7EB] text-muted-foreground">
              {columns.map((column) => (
                <th
                  key={column.accessorKey}
                  className="px-8 py-4 text-left text-[1rem] font-medium"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`${earnings.length > 0 ? "" : "h-full"}`}>
            {earnings.length > 0 ? (
              earnings.map((earning) => (
                <tr
                  key={earning.id}
                  className="hover:bg-[#f8f8fa] cursor-pointer transition-colors"
                >
                  <td className="px-8 py-4">{earning.date}</td>
                  <td className="px-8 py-4">{earning.time}</td>
                  <td className="px-8 py-4 flex">
                    {earning.earning}
                    <Image src={'/ether.svg'} width={20} height={20} alt="" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-full">
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <Image src={nullImg} width={80} height={80} alt="" />
                    <p className="text-muted-foreground text-[1rem] mt-4">
                      {noData}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;