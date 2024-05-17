import useCustomStore from "@/hooks/useCustomStore";
import { useMainStore } from "@/hooks/useMainStore";
import { useRewardnHPStore } from "@/hooks/useRewardStore";

export default function SummaryTable() {
    const allWinOrders = useCustomStore(useRewardnHPStore, (state: any) => state.allWinOrders)
    const total = useCustomStore(useMainStore, (state: any) => state.total)
    const currentAmount = useCustomStore(useMainStore, (state: any) => state.currentAmount)
    const nidProfit = total * 0.2
    const paiProfit = total - (nidProfit + allWinOrders)
    const remainAmount = total - currentAmount

    const header_css = "input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg"
    return (
        <div className="overflow-x-auto pt-20">
            <table className="table table-auto table-lg">
                {/* head */}
                <thead>
                    <tr className={header_css}>
                        <th className="">ยอดรวมทั้งหมด</th>
                        <th className="">รายได้</th>
                        <th className="">ยอดที่ต้องจ่ายปาย</th>
                        <th className="">ยอดปัจจุบัน</th>
                        <th className="">ค้างชำระ</th>
                        <th className="">ยอดถูกหวย</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="input input-bordered text-white input-secondary w-full max-w-xs text-right font-extrabold">{total?.toLocaleString('en-US')}</td>
                        <td className="input input-bordered text-success input-secondary w-full max-w-xs text-right font-extrabold">{nidProfit?.toLocaleString('en-US')}</td>
                        <td className="input input-bordered text-purple-500 input-secondary w-full max-w-xs text-right bg-neutral font-extrabold">{paiProfit?.toLocaleString('en-US')}</td>
                        <td className="input input-bordered text-white input-secondary w-full max-w-xs text-right bg-info">{currentAmount?.toLocaleString('en-US')}</td>
                        <td className="input input-bordered text-red-600 input-secondary w-full max-w-xs text-right bg-base-200 font-extrabold">{remainAmount?.toLocaleString('en-US')}</td>
                        <td className="input input-bordered text-green-600 input-base-100 w-full max-w-xs text-right bg-neutral font-extrabold">{allWinOrders?.toLocaleString('en-US')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}