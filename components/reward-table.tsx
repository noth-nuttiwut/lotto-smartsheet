"use client"
import useCustomStore from "@/hooks/useCustomStore";
import { useRewardnHPStore } from "@/hooks/useRewardStore";
import { Rewards } from "@/model/rewards";

export default function RewardsTable() {
    const rewards: Rewards = useCustomStore(useRewardnHPStore, (state: any) => state.rewards)
    const setRewards = useRewardnHPStore((state) => state.setRewards)

    const formattedTable = [
        ["3 บน", rewards?.topThreeDigit],
        ["3 โต๊ด", rewards?.todThreeDigit],
        ["3 ล่าง", rewards?.botThreeDigit],
        ["2 บน,ล่าง", rewards?.top2Digit]
    ]

    const keyMapper = [
        "topThreeDigit",
        "todThreeDigit",
        "botThreeDigit",
        "top2Digit"
    ]
    return (
        <div className="p-8">
            <div className="overflow-x-auto">
                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th className="p-4 text-white text-xl text-center font-bold border border-slate-300" colSpan={2}> ราคาจ่าย </th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            formattedTable?.map((row: string[], i: number) => {
                                return (
                                    <tr key={i + "_rtr"} className="p-4 text-white text-xl text-center font-bold border border-slate-300">
                                        {
                                            row.map((el: string, j: number) => {
                                                return j == 0 ?
                                                    <td key={j + "_rr"} className="border border-slate-300">
                                                        {el}
                                                    </td>
                                                    :
                                                    <td key={j + "_rr"} className="border border-slate-300">
                                                        <input type="text" className="input text-green-600 font-extrabold w-full max-w-xs" defaultValue={el} onChange={(ev) => {
                                                            var newData: any = {}
                                                            newData[keyMapper[i]] = ev.target.value
                                                            return setRewards(newData)
                                                        }}/>
                                                    </td>
                                            })
                                        }
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