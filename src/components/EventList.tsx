import type { Event } from '../types';

type EventListProps = {
    events: Event[];    
}

export default function EventList({ events }: EventListProps) {
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center mb-5">
        Gastos e Ingresos
      </h2>

      {events.map(event => (
        <div key={event.id} className="bg-white p-5 rounded shadow mb-3 flex justify-between items-center">
          <div className="space-y-2 relative">
            <p className="text-slate-500 text-sm">
              Categoría {event.category}
            </p>
            <p className="text-2xl font-bold pt-5 text-gray-800">
              {event.description}
            </p>
            <p className="font-black text-4xl text-red-500">
              ${event.amount.toFixed(2)}
              <span className="text-sm text-gray-500 font-normal ml-2">
                {event.date.toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
