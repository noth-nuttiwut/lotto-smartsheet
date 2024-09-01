"use client"
import { useMainStore } from "@/hooks/useMainStore";
import useCustomStore from "@/hooks/useCustomStore";
import { useRef } from "react";


const UserOrders = ({ username , hColor }  : { username: string , hColor : string}) => {
    const headerName = `แก้ไขรายการของ ${username}`
    const modalRef = useRef(null);
    const orders = useCustomStore(useMainStore, (state : any) => state.orders)
    const newOrders = useCustomStore(useMainStore, (state : any) => state.newOrders)
    const previewOrderForUser = useCustomStore(useMainStore, (state : any) => state.previewOrderForUser)
    const removeOrder = useMainStore((state) => state.removeOrder)

    const editNewOrder = useMainStore((state) => state.editNewOrder)
    const makePreviewOrderForUser = useMainStore((state) => state.makePreviewOrderForUser)
    const addOrder = useMainStore((state) => state.addOrderForUser)
    const summarize = useMainStore((state) => state.summarize)
    const clearPreviewOrder = useMainStore((state) => state.clearPreviewOrder)

    const historyOrder = orders?.filter(( el : any) => el.name == username)
    
    const onOpenModal = () => {
        makePreviewOrderForUser(newOrders?.setType || "บน", Date.now(), hColor)
        const modalDialog: any = modalRef.current
        try {
            modalDialog.showModal()
            clearPreviewOrder()
            editNewOrder({ name: username })
        } catch (error) {
            console.log("Modal not found ", error)
        }
    }
    const handleAddOrder = (ev : React.MouseEvent<HTMLElement>) => {
        ev.preventDefault();
        addOrder()
    }

    const handleRemoveOrder = (ev : React.MouseEvent<HTMLElement>, id : string) => {
        ev.preventDefault();
        removeOrder(id)
    }


    const handleOK = () => {
        summarize()
        console.log("Done ...")
    }
    return (
        <>
            <button className="btn btn-info btn-sm" onClick={() => onOpenModal()} data-toggle="modal" data-target="#edit_user_orders"> แก้ไข </button>
            <dialog id="edit_user_orders" className="modal" ref={modalRef}>
                <form method="dialog" className="modal-box gap-8 w-8/12 max-w-4xl">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">✕</button>
                    <h1 className="text-2xl font-bold text-accent py-4 border-b-2 border-slate-200"> {headerName} </h1>
                    <div className="flex gap-4 pt-4 justify-between">
                        <div className="flex gap-4 flex-col pt-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">ชื่อ</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" placeholder="ชื่อ" className="input input-bordered w-full max-w-xs placeholder-slate-700" defaultValue={username}  disabled={true}/>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">หมายเลข</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" placeholder="00" className="input input-bordered w-full max-w-xs placeholder-slate-700" minLength={2} maxLength={3} defaultValue={newOrders?.number} onChange={(ev) => editNewOrder({ number: ev.target.value })} />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">จำนวนเงิน</span>
                                </label>
                                <label className="input-group">
                                    <span>จำนวน</span>
                                    <input type="number" placeholder="123" className="input input-bordered w-full max-w-xs placeholder-slate-700 text-center" defaultValue={newOrders?.price ?? 0} step={5} min={0} onChange={(ev) => editNewOrder({ price: parseInt(ev.target.value) })} />
                                    <span>THB</span>
                                </label>
                            </div>
                            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-info"> เลขชุด</label>
                            <select className="select select-ghost w-full max-w-xs" defaultValue={newOrders?.setType} onChange={(ev) => editNewOrder({ setType: ev.target.value, color : hColor })}>
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
                            <div className="text-2xl font-bold text-accent text-center"> รายการสั่งซื้อ </div>
                            <div className="overflow-x-auto pt-4">
                                <table className="table">
                                    {/* header */}
                                    <thead>
                                        <tr className="text-lg bg-slate-800">
                                            <th>ชื่อ</th>
                                            <th>หมายเลข</th>
                                            <th>บน</th>
                                            <th>โต๊ด</th>
                                            <th>ล่าง</th>
                                            <th>รวม</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            historyOrder?.map((el : any) => {
                                                return (
                                                    <tr key={el.id} className="bg-slate-700 text-center">
                                                        <th> {el.name}  </th>
                                                        <td> {el.number}  </td>
                                                        <td> {el.top ?? 0}  </td>
                                                        <td> {el.tod ?? 0}  </td>
                                                        <td> {el.bot ?? 0}  </td>
                                                        <td> {el.sum ?? 0}  </td>
                                                        <td> <button className="btn btn-xs btn-error" onClick={(ev) => handleRemoveOrder(ev, el?.id)}> X </button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <th colSpan={2} className="text-lg font-bold text-accent"> ตัวอย่างก่อนเพิ่ม </th>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                            <td> </td>
                                        </tr>
                                        {
                                            previewOrderForUser?.map((el : any) => {
                                                return (
                                                    <tr key={el.id} className="bg-emerald-200 font-bold text-black text-center">
                                                        <th> {el.name}  </th>
                                                        <td> {el.number}  </td>
                                                        <td> {el.top ?? 0}  </td>
                                                        <td> {el.tod ?? 0}  </td>
                                                        <td> {el.bot ?? 0}  </td>
                                                        <td> {el.sum ?? 0}  </td>
                                                        <td> </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div className="pt-8 flex justify-between items-center">
                        <button className="btn btn-wide btn-success font-extrabold text-green-900 text-xl" onClick={ (ev) => handleAddOrder(ev) }> เพิ่ม </button>
                        <button className="btn btn-wide btn-info font-extrabold text-slate-100 text-xl" onClick={ () =>  handleOK() }> ตกลง </button>
                    </div>
                </form>
            </dialog>
        </>

    )
}

export default UserOrders