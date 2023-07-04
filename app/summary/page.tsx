"use client"

import SummaryTable from "../../components/summary-table";
import CustomerSummaryTable from "../../components/customer-summary-table";

export default function Rewards() {
  const sumHeaders = ["ชื่อ", "หมายเลข", "บน", "โต๊ด", "ล่าง", "รวม", "จ่ายเงิน"]
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='text-3xl font-semibold text-slate-100'> สรุปยอดการซื้อ </div>
      <div className="flex flex-col py-8">
        <CustomerSummaryTable headers={sumHeaders} />
        <SummaryTable />
      </div>
    </main>

  )
}
