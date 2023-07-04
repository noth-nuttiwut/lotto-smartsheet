"use client"
import useCustomStore from '@/hooks/useCustomStore';
import { useMainStore } from '@/hooks/useMainStore';
import { toast } from 'react-toastify';
import AddSetNumbers from "../components/addsetnumbers";
import NRow from "../components/nrow";



export default function Home() {
  const orders = useCustomStore(useMainStore, (state : any) => state.orders)
  const uniqOrder = useCustomStore(useMainStore, (state : any) => state.uniqOrder)
  const filterKeyword = useCustomStore(useMainStore, (state : any) => state.filterKeyword)
  const changeKeyword = useMainStore((state) => state.changeKeyword)
  const changeColor = useMainStore((state) => state.changeColor)

  // const debouncedValue = useDebounce<Order[]>(orders, 10e3)
  // useEffect(() => {
  //   console.log("Load data ... ")
  //   setDefaultOrders()
  // }, [])

  const saveData = async () => {
    const resp = await fetch("http://localhost:3000/api/prefetch", {
      method: "POST",
      body: JSON.stringify({
        orders: orders
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await resp.json()
    console.log(result)
    if (result.status == 200) {
      toast.success("saved successfully !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  // useEffect(() => {
  //   console.log("Start debouncedValue ...")
  //   // if (isloaded) saveData()
  //   saveData()
  // }, [debouncedValue])

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 gap-8">
        <div className='flex text-3xl font-semibold text-white'> ตารางการซื้อขาย </div>

        <div className="flex justify-between gap-8 flex-wrap xl:flex-nowrap">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-info"> ตัวกรอง </label>
              <select className="select select-ghost w-full max-w-xs" defaultValue={filterKeyword} onChange={(ev) => changeKeyword(ev.target.value)}>
                <option disabled >เลือกรายชื่อที่จะแสดงผล</option>
                <option> ทั้งหมด</option>
                {
                 uniqOrder?.map((el: any, index: number) => {
                  return (
                    <option key={index+"-"+el}> {el.name} </option>
                  )
                })
                }
              </select>
            </div>
            <div>
              {
                uniqOrder?.map((el: any, index: number) => {
                  return (
                    <div className="flex" key={index + "_col"}>
                      <input type="text" className="input input-bordered input-secondary w-full max-w-xs text-left" value={el.name} readOnly={true} />
                      <input type="color" className="input input-bordered input-secondary w-full max-w-xs text-left" defaultValue={el.color} onChange={(ev) => changeColor({ color: ev.target.value }, el.name)} />
                    </div>
                  )

                })
              }
            </div>


          </div>
          <div className="flex flex-col items-top">
            <div className="flex">
              <input type="text" value={"ชื่อ"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
              <input type="text" value={"หมายเลข"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
              <input type="text" value={"บน"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
              <input type="text" value={"โต๊ด"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
              <input type="text" value={"ล่าง"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
              <input type="text" value={"รวม"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
              <input type="text" value={""} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl" readOnly={true} />
            </div>
            {
              filterKeyword == "ทั้งหมด" ?
                orders?.map((rowData : any, index: number) => {
                  return (
                    <NRow rowData={rowData} key={rowData.id} index={index} />
                  )
                })
                :
                orders?.filter((el : any) => el?.name == filterKeyword)?.map((rowData :any, index: number) => {
                  return (
                    <NRow rowData={rowData} key={rowData.id} index={index} />
                  )
                })
            }

          </div>
          <div className="flex gap-8">
            <AddSetNumbers />
          </div>
        </div>


      </main>

    </>

  )
}
