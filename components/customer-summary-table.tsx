
import useCustomStore from "@/hooks/useCustomStore";
import { useMainStore } from "@/hooks/useMainStore";

export default function CustomerSummaryTable({  headers }: {  headers: string[] }) {
    const summaryOrders = useCustomStore(useMainStore, (state : any) => state.summaryOrders)
    const onPaidOrder = useMainStore((state) => state.onPaidOrder)
    return (
        <>
            {/* header */}
            < div className="flex" >
                {
                    headers.map((hName : string, index : number) => {
                        return <input type="text" key={index} value={hName} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
                    })
                }
            </div >

            {/* table */}
            <div>
                {
                    summaryOrders?.filter((el: any )=> el.name).map((el: any, index : number) => {
                        var nameColStyle = "input input-bordered text-white input-secondary w-full max-w-xs"
                        var othersColStyle = "input input-bordered text-white input-secondary w-full max-w-xs text-right"
                        var checkBoxStyle = "checkbox checkbox-primary checkbox-lg"
                        return (
                            <div className="flex" key={el.id} data-tip={el.number}>
                                <input type="text" placeholder="ชื่อ" className={nameColStyle} value={el.name} readOnly={true} />
                                <div className="tooltip tooltip-info" data-tip={el.number}>
                                    <input type="button" className="input input-bordered text-white input-secondary w-full max-w-xs px-24" value={"XxxX"}/> 
                                </div>
                                <input type="text" className={othersColStyle} value={el.top ?? 0} readOnly={true} />
                                <input type="text" className={othersColStyle} value={el.tod ?? 0} readOnly={true} />
                                <input type="text" className={othersColStyle} value={el.bot ?? 0} readOnly={true} />
                                <input type="text" className="input input-bordered text-red-600 input-secondary w-full max-w-xs text-right font-extrabold" value={el.sum?.toLocaleString('en-US') ?? 0} readOnly={true} />
                                <div className="flex w-full max-w-xs justify-center items-center px-4">
                                    <input type="checkbox" defaultChecked={el.isPaid ?? false} className={checkBoxStyle} onChange={(ev) => onPaidOrder(ev.target.checked, index)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}