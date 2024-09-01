
import { useMainStore } from "@/hooks/useMainStore";
import useCustomStore from "@/hooks/useCustomStore";
import { useRef } from "react";

const AddSetNumbers = () => {
    const modalRef = useRef(null);
    const newOrders = useCustomStore(useMainStore, (state : any) => state.newOrders)
    const previewOrder = useCustomStore(useMainStore, (state : any) => state.previewOrder)

    const editNewOrder = useMainStore((state) => state.editNewOrder)
    const makePreviewOrder = useMainStore((state) => state.makePreviewOrder)
    const addOrder = useMainStore((state) => state.addOrder)



    const onOpenModal = () => {
        makePreviewOrder(newOrders?.setType || "บน", Date.now(), "#fefefe")
        const modalDialog: any = modalRef.current
        try {
            modalDialog.showModal()
        } catch (error) {
            console.log("Modal not found ", error)
        }
    }
    return (
        <>
            <button className="btn btn-lg btn-success px-10" onClick={() => onOpenModal()} data-toggle="modal" data-target="#set_number_modal">เพิ่มชุด</button>
            <dialog id="set_number_modal" className="modal" ref={modalRef}>
                <form method="dialog" className="modal-box gap-8 w-8/12 max-w-4xl">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl hover:bg-red-600">✕</button>
                    <h1 className="text-2xl font-bold text-accent py-4 border-b-2 border-slate-200">เพิ่มแบบชุด</h1>
                    <div className="flex gap-4 pt-4 justify-between">
                        <div className="flex gap-4 flex-col pt-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text block mb-2 text-lg font-medium text-sky-700">ชื่อ</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" placeholder="ชื่อ" className="input input-bordered w-full max-w-xs placeholder-slate-700" defaultValue={newOrders?.name} onChange={(ev) => editNewOrder({ name: ev.target.value })} />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text block mb-2 text-lg font-medium text-sky-700">หมายเลข</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" placeholder="00" className="input input-bordered w-full max-w-xs placeholder-slate-700" minLength={2} maxLength={3} defaultValue={newOrders?.number} onChange={(ev) => editNewOrder({ number: ev.target.value })} />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text block mb-2 text-lg font-medium text-sky-700">จำนวนเงิน</span>
                                </label>
                                <label className="input-group">
                                    <span>จำนวน</span>
                                    <input type="number" placeholder="123" className="input input-bordered w-full max-w-xs placeholder-slate-700 text-center" defaultValue={newOrders?.price} step={5} min={0} onChange={(ev) => editNewOrder({ price: parseInt(ev.target.value) })} />
                                    <span>THB</span>
                                </label>
                            </div>
                            <label className="block mb-2 text-lg font-medium text-sky-700"> เลขชุด</label>
                            <select className="select select-ghost w-full max-w-xs" defaultValue={newOrders?.setType} onChange={(ev) => editNewOrder({ setType: ev.target.value })}>
                                <option disabled>เลือกชุด</option>
                                <option>บน</option>
                                <option>บน+ล่าง</option>
                                <option>บน+โต๊ด</option>
                                <option>โต๊ด</option>
                                <option>ล่าง</option>
                                <option>ชุด (บน)</option>
                                <option>ชุด (บน+ล่าง)</option>
                                <option>ชุด (บน+โต๊ด)</option>
                                <option>ชุด (โต๊ด)</option>
                                <option>ชุด (ล่าง)</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold text-accent text-center">ตัวอย่าง</div>
                            <div className="overflow-x-auto pt-4">
                                <table className="table table-zebra">
                                    {/* head */}
                                    <thead>
                                        <tr className="text-lg bg-slate-800">
                                            <th>ชื่อ</th>
                                            <th>หมายเลข</th>
                                            <th>บน</th>
                                            <th>โต๊ด</th>
                                            <th>ล่าง</th>
                                            <th>รวม</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            previewOrder?.map((el : any) => {
                                                return (
                                                    <tr key={el.id}>
                                                        <th> {el.name}  </th>
                                                        <td> {el.number}  </td>
                                                        <td> {el.top ?? 0}  </td>
                                                        <td> {el.tod ?? 0}  </td>
                                                        <td> {el.bot ?? 0}  </td>
                                                        <td> {el.sum ?? 0}  </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div className="pt-8 flex justify-end items-center">
                        <button className="btn btn-wide btn-success font-extrabold text-black text-xl" onClick={() => addOrder()}> เพิ่ม </button>
                    </div>
                </form>
            </dialog>
        </>

    )
}

export default AddSetNumbers