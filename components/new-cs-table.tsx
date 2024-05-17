
import useCustomStore from "@/hooks/useCustomStore";
import { useMainStore } from "@/hooks/useMainStore";

export default function NewCSTable({ headers }: { headers: string[] }) {
    const summaryOrders = useCustomStore(useMainStore, (state: any) => state.summaryOrders)
    const onPaidOrder = useMainStore((state) => state.onPaidOrder)
    var nameColStyle = "text-white"
    var topColStyle = "text-info"
    var todColStyle = "text-success"
    var botColStyle = "text-warning"
    var checkBoxStyle = "checkbox checkbox-success checkbox-lg"
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra table-lg">
                <thead>
                    <tr className="bg-black">
                        {
                            headers.map((hName: string, index: number) => {
                                return <th className=" text-gray-200 text-xl"> {hName} </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        summaryOrders?.filter((el: any) => el.name).map((el: any, index: number) => {
                            return (
                                <tr key={el.id} data-tip={el.number}>
                                    <td className={nameColStyle} >
                                        {el.name}
                                    </td>
                                    <td  className="tooltip tooltip-info text-center" data-tip={el.number}>
                                        XxxX
                                    </td>
                                    <td className={topColStyle}>{el.top ?? 0}</td>
                                    <td className={todColStyle}>{el.tod ?? 0}</td>
                                    <td className={botColStyle}>{el.bot ?? 0}</td>
                                    <td className=" text-red-600 font-extrabold"> {el.sum?.toLocaleString('en-US') ?? 0} </td>
                                    <td>
                                        <label>
                                            <input type="checkbox" defaultChecked={el.isPaid ?? false} className={checkBoxStyle} onChange={(ev) => onPaidOrder(ev.target.checked, index)} />
                                        </label>
                                    </td>
                                </tr>

                            )
                        })
                    }

                </tbody>
            </table>

        </div>


    )
}