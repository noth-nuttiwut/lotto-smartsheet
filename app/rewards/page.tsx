import RewardsTable from "../../components/reward-table";
import HalfPayTable from "../../components/half-pay-table";
export default async function Rewards() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className='text-3xl font-semibold text-slate-100'> อัตราการจ่ายและเลขอั้น </div>
        <div className="flex justify-between sm:flex-wrap gap-10">
          <RewardsTable />
          <HalfPayTable />
        </div>
      </main>

    </>

  )
}
