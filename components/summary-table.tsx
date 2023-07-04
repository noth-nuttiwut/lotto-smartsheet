import useCustomStore from "@/hooks/useCustomStore";
import { useMainStore } from "@/hooks/useMainStore";
import { useRewardnHPStore } from "@/hooks/useRewardStore";

export default function SummaryTable() {
    const allWinOrders = useCustomStore(useRewardnHPStore, (state : any) => state.allWinOrders)
    const total = useCustomStore(useMainStore, (state : any) => state.total)
    const currentAmount = useCustomStore(useMainStore, (state : any) => state.currentAmount)
    const nidProfit = total * 0.2
    const paiProfit = total - nidProfit
    const remainAmount = total - currentAmount
    return (
        <>
            {/* header - 2 */}
            <div className="flex pt-20">
                <input type="text" value={"ยอดรวมทั้งหมด"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
                <input type="text" value={"รายได้"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
                <input type="text" value={"ยอดที่ต้องจ่ายปาย"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
                <input type="text" value={"ยอดปัจจุบัน"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
                <input type="text" value={"ค้างชำระ"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
                <input type="text" value={"ยอดถูกหวย"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
            </div>

            {/* table - 2 */}
            <div>
                {
                    <div className="flex">
                        <input type="text" className="input input-bordered text-white input-secondary w-full max-w-xs text-right bg-primary" value={total?.toLocaleString('en-US')} readOnly={true} />
                        <input type="text" className="input input-bordered text-white input-secondary w-full max-w-xs text-right bg-success" value={nidProfit?.toLocaleString('en-US')} readOnly={true} />
                        <input type="text" className="input input-bordered text-white input-secondary w-full max-w-xs text-right bg-neutral" value={paiProfit?.toLocaleString('en-US')} readOnly={true} />
                        <input type="text" className="input input-bordered text-white input-secondary w-full max-w-xs text-right bg-info" value={currentAmount?.toLocaleString('en-US')} readOnly={true} />
                        <input type="text" className="input input-bordered text-red-600 input-secondary w-full max-w-xs text-right bg-base-200 font-extrabold" value={remainAmount?.toLocaleString('en-US')} readOnly={true} />
                        <input type="text" className="input input-bordered text-green-600 input-base-100 w-full max-w-xs text-right bg-neutral font-extrabold" value={allWinOrders?.toLocaleString('en-US')} readOnly={true} />
                    </div>
                }
            </div>
        </>
    )

}