import { useMemo } from "react"
import type { Event } from "../types"
import BillsDisplay from "./BillsDisplay"

type BillsTrackerProps = {
    events: Event[]
}

export default function BillsTracker({ events }: BillsTrackerProps) {
    const totalBills = useMemo( () => events.reduce( (total, event) => event.category === 1 ? total + event.amount : total, 0), [events])
    const totalIncome = useMemo( () => events.reduce( (total, event) => event.category === 2 ? total + event.amount : total, 0), [events])
    const netTotal = useMemo( () => totalIncome - totalBills, [events])
  return (
    <>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Resumen Financiero</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
              <h3 className="text-sm font-semibold text-red-700 mb-2">Total Gastos</h3>
              <BillsDisplay 
                  value={totalBills}
                  type="expense"
              />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h3 className="text-sm font-semibold text-green-700 mb-2">Total Ingresos</h3>
              <BillsDisplay 
                  value={totalIncome}
                  type="income"
              />
            </div>
            <div className={`bg-gradient-to-br p-6 rounded-xl border ${
              netTotal >= 0 
                ? 'from-blue-50 to-blue-100 border-blue-200' 
                : 'from-orange-50 to-orange-100 border-orange-200'
            }`}>
              <h3 className={`text-sm font-semibold mb-2 ${
                netTotal >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>Balance</h3>
              <BillsDisplay 
                  value={netTotal}
                  type={netTotal >= 0 ? "income" : "expense"}
              />
            </div>
        </div>
    </>
  )
}
