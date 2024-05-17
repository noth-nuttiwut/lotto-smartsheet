"use client"

import SummaryTable from "../../components/summary-table";
import NewCSTable from "../../components/new-cs-table";

export default function Rewards() {
  const sumHeaders = ["ชื่อ", "หมายเลข", "บน", "โต๊ด", "ล่าง", "รวม", "จ่ายเงิน"]
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 gap-8 w-full">
      <div className='text-3xl font-semibold text-slate-100'> สรุปยอดการซื้อ </div>
      <div className="flex flex-col gap-10">
        <NewCSTable headers={sumHeaders} />
        <SummaryTable />
      </div>
    </main>

  )
}
