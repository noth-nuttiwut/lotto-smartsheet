"use client"
import useCustomStore from "@/hooks/useCustomStore";
import { useRewardnHPStore } from "@/hooks/useRewardStore";


export default function HalfPayTable() {

    const hData = useCustomStore(useRewardnHPStore, (state : any) => state.HPNumbers)
    const setHPN = useRewardnHPStore((state) => state.setHPN)
    
    // 3 บน เต็ง โต๊ด	2 บน-ล่าง	
    const today = new Date();
    var year = today.toLocaleString("default", { year: "numeric" });
    var month = today.toLocaleString("default", { month: "2-digit" });
    var day = today.toLocaleString("default", { day: "2-digit" });
    const today_formatted = `${day}/${month}/${year}`
    const hColumnLabels = [
        ["เลขอั้นวันที่", today_formatted, "จ่ายครึ่งราคา"]
    ]
    
    const formatHData = [
        hData?.threeDigit,
        hData?.twoDigit
    ]

    return (
        <div className="p-10">
            <div className="overflow-x-auto">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            {
                                hColumnLabels[0].map((el, i) => {
                                    return <th key={i + "_hph"} className="p-4 text-white text-xl text-center font-bold border border-slate-300"> {el} </th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody >
                        {
                            formatHData?.map((row : string [], i: number) => {
                                return (
                                    <tr key={i + "_hpr"} className="p-4 text-white text-xl text-center font-bold border border-slate-300">
                                        <td className="border border-slate-300">{row ? row[0]: ""}</td>
                                        <td className="border border-slate-300">
                                            <textarea className="textarea textarea-lg w-full max-w-2xl h-full min-h-[300px] text-red-500" defaultValue={row ? row[1]: ""} onChange={(ev) => setHPN(ev.target.value, row[0])}></textarea>
                                        </td>
                                        <td className="border border-slate-300">{row ? row[2]: ""}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}