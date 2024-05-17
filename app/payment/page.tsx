"use client"
import useCustomStore from "@/hooks/useCustomStore";
import { useRewardnHPStore } from "@/hooks/useRewardStore";
import { useMainStore } from "@/hooks/useMainStore";
import { Rewards, HPNumbersProps } from "@/model/rewards";
import { useEffect } from "react";

export default function Payment() {
  const top2digit = useCustomStore(useRewardnHPStore, (state: any) => state.topTwoDigit)
  const bot2digit = useCustomStore(useRewardnHPStore, (state: any) => state.botTwoDigit)
  const top3digit = useCustomStore(useRewardnHPStore, (state: any) => state.topThreeDigit)
  const bot3digit1 = useCustomStore(useRewardnHPStore, (state: any) => state.botThreeDigit1)
  const bot3digit2 = useCustomStore(useRewardnHPStore, (state: any) => state.botThreeDigit2)
  const orders = useCustomStore(useMainStore, (state: any) => state.orders)
  const rewards: Rewards = useCustomStore(useRewardnHPStore, (state: any) => state.rewards)
  const HPNumbers: HPNumbersProps = useCustomStore(useRewardnHPStore, (state: any) => state.HPNumbers)
  

  const setRewardDigit = useRewardnHPStore((state) => state.setRewardDigit)
  const setAllWinOrders = useRewardnHPStore((state) => state.setAllWinOrders)

function nPermute(arr: string[]) {
  var result: string[] = []
  // currentSize should be invoked with the array size
  function permutation(arr: string[], currentSize: number) {
      if (currentSize == 1) { // recursion base-case (end)
          result.push(arr.join(""));
          return;
      }

      for (let i = 0; i < currentSize; i++) {
          permutation(arr, currentSize - 1);
          if (currentSize % 2 == 1) {
              let temp = arr[0];
              arr[0] = arr[currentSize - 1];
              arr[currentSize - 1] = temp;
          } else {
              let temp = arr[i];
              arr[i] = arr[currentSize - 1];
              arr[currentSize - 1] = temp;
          }
      }
  }
  permutation(arr, arr.length)
  return [...new Set(result)]

}

  const winOrders = orders?.map((el: any) => {
    var winInfo = { win: false, buyAmount: ``, rewardPrice: 0, halfPayRate: false}
    var check_result = { ...el }
    const setNumbers = nPermute([ ...el?.number ])
    // console.log(" --> ", el?.number, setNumbers, [top2digit, bot2digit, top3digit, bot3digit1, bot3digit2])
    var temp_hpNumbers = [...HPNumbers?.threeDigit[1].split(" "), ...HPNumbers?.twoDigit[1].split(" ") ]
    const hpNumbers = temp_hpNumbers.map(hp_n => nPermute([ ...hp_n ])).flat()

    const payRate = hpNumbers.includes(el?.number) ? 0.5 : 1

    if (el?.top > 0 && el?.number == top2digit) { // บน
      
      winInfo = {
        win: true, buyAmount: `${winInfo?.buyAmount} (บน) ${el?.top}`,
        rewardPrice: el?.top * (payRate * parseInt(rewards?.top2Digit)) + winInfo?.rewardPrice,
        halfPayRate: payRate == 0.5 ? true : false
      }

    }
    if (el?.bot > 0 && el?.number == bot2digit) { // ล่าง
      winInfo = {
        win: true, buyAmount: `${winInfo?.buyAmount} (ล่าง) ${el?.bot}`,
        rewardPrice: el?.bot * (payRate * parseInt(rewards?.top2Digit)) + winInfo?.rewardPrice,
        halfPayRate: payRate == 0.5 ? true : false
      }
    }
    if (el?.top > 0 && el?.number == top3digit) { // บน
      winInfo = {
        win: true, buyAmount: `${winInfo?.buyAmount} (บน) ${el?.top}`,
        rewardPrice: el?.top * (payRate * parseInt(rewards?.topThreeDigit)) + winInfo?.rewardPrice,
        halfPayRate: payRate == 0.5 ? true : false
      }
    }
    if (el?.bot > 0 && el?.number == bot3digit1) { // ล่าง
      winInfo = {
        win: true, buyAmount: `${winInfo?.buyAmount} (ล่าง) ${el?.bot}`,
        rewardPrice: el?.bot * (payRate * parseInt(rewards?.botThreeDigit)) + winInfo?.rewardPrice,
        halfPayRate: payRate == 0.5 ? true : false
      }
    }
    if (el?.bot > 0 && el?.number == bot3digit2) { // ล่าง
      winInfo = {
        win: true, buyAmount: `${winInfo?.buyAmount} (ล่าง) ${el?.bot}`,
        rewardPrice: el?.bot * (payRate * parseInt(rewards?.botThreeDigit)) + winInfo?.rewardPrice,
        halfPayRate: payRate == 0.5 ? true : false
      }
    }
    if (el?.tod > 0 && setNumbers.includes(top3digit)) { // โต๊ด

      const payRateTod = setNumbers.filter(el => hpNumbers.includes(el)).length > 0 ? 0.5 : 1
      winInfo = {
        win: true, buyAmount: `${winInfo?.buyAmount} (โต๊ด) ${el?.tod}`,
        rewardPrice: el?.tod * (payRate * parseInt(rewards?.todThreeDigit)) + winInfo?.rewardPrice,
        halfPayRate: payRateTod == 0.5 ? true : false
      }
    }
    return { ...check_result, ...winInfo }

  }).filter((el: any) => el?.win)

  const getAllPrice = winOrders?.reduce((accumulator: any, object: any) => {
    return accumulator + object.rewardPrice;
  }, 0)

  useEffect(() => {
    setAllWinOrders(getAllPrice)
    
  }, [getAllPrice])


  return (
    <>
      <main className="flex min-h-screen flex-col items-center pt-20 pb-10 px-20">
        <div className='text-3xl font-semibold text-slate-100'> สรุปยอดคนถูก </div>
        <div className="flex justify-between gap-16">
          <div className="flex flex-col gap-6 pt-20">
            <div className="form-control">
              <div className="form-control">
                <label className="label">
                  <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">เลข2 ตัว บน</span>
                </label>
                <label className="input-group">
                  <input type="text" defaultValue={top2digit} placeholder="02" className="input border-slate-400 w-full max-w-xs placeholder-slate-700 text-white" maxLength={2} onChange={(ev) => setRewardDigit(ev.target.value, "top2digit")} />
                </label>
              </div>

              <label className="label">
                <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">เลข2 ตัว ล่าง</span>
              </label>
              <label className="input-group">
                <input type="text" defaultValue={bot2digit} placeholder="56" className="input border-slate-400 w-full max-w-xs placeholder-slate-700 text-white" maxLength={2} onChange={(ev) => setRewardDigit(ev.target.value, "bot2digit")} />
              </label>
            </div>


            <div className="form-control">
              <label className="label">
                <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">เลข3 ตัว บน</span>
              </label>
              <label className="input-group">
                <input type="text" defaultValue={top3digit} placeholder="123" className="input border-slate-400 w-full max-w-xs placeholder-slate-700 text-white" maxLength={3} onChange={(ev) => setRewardDigit(ev.target.value, "top3digit")} />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">เลข3 ตัว ล่าง</span>
              </label>
              <label className="input-group">
                <input type="text" defaultValue={bot3digit1} placeholder="056" className="input border-slate-400 w-full max-w-xs placeholder-slate-700 text-white" maxLength={3} onChange={(ev) => setRewardDigit(ev.target.value, "bot3digit1")} />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text block mb-2 text-lg font-medium text-gray-900 dark:text-info">เลข3 ตัว ล่าง</span>
              </label>
              <label className="input-group">
                <input type="text" defaultValue={bot3digit2} placeholder="456" className="input border-slate-400 w-full max-w-xs placeholder-slate-700 text-white" maxLength={3} onChange={(ev) => setRewardDigit(ev.target.value, "bot3digit2")} />
              </label>
            </div>
          </div>
          <div>
            {/* header - 2 */}
            <div className="flex pt-20">
              <input type="text" value={"ชื่อ"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
              <input type="text" value={"หมายเลข"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
              <input type="text" value={"ซื้อ"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
              <input type="text" value={"เลขอั้น"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
              <input type="text" value={"ยอดที่ถูก"} className="input border text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-lg" readOnly={true} />
            </div>

            {/* table - 2 */}
            <div>
              {
                winOrders?.length !== 0 ?
                  winOrders?.map((el: any, index: number) => {
                    return (
                      <div className="flex" key={el?.id}>
                        <input type="text" className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500" value={el?.name} readOnly={true} />
                        <input type="text" className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500 text-right" value={el?.number} readOnly={true} />
                        <input type="text" className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500 text-right" value={el?.buyAmount} readOnly={true} />
                        <input type="text" className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500 text-center" value={el?.halfPayRate ? "⭕️" : "❌"} readOnly={true} />
                        <input type="text" className="input text-green-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500 text-right" value={el?.rewardPrice?.toLocaleString('en-US')} readOnly={true} />
                      </div>
                    )
                  })
                  :
                  <div className="flex">
                    <input type="text" className="input text-slate-400 font-extrabold w-full bg-base-100 border-slate-500 text-center" value={"ไม่พบผู้ถูกรางวัล"} readOnly={true} />
                  </div>



              }
            </div>
            <div className="flex pt-14">
              <input type="text" value={""} className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500" readOnly={true} />
              <input type="text" value={""} className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500" readOnly={true} />
              <input type="text" value={""} className="input text-red-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500" readOnly={true} />
              <input type="text" value={"ยอดรวม"} className="input text-green-600 font-extrabold w-full max-w-xs bg-base-100 border-slate-500" readOnly={true} />
              <input type="text" value={getAllPrice?.toLocaleString('en-US')} className="input text-green-600 font-extrabold w-full max-w-xs bg-green-100 border-slate-500 text-right" readOnly={true} />
            </div>
          </div>
        </div>
      </main>

    </>

  )
}