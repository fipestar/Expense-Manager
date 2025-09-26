import type { Event } from '../types';
import { categories } from '../data';
import { useMemo, type Dispatch } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import type { EventActions } from '../reducers/event-reducer';

type EventListProps = {
    events: Event[],
    dispatch: Dispatch<EventActions>   
}

export default function EventList({ events, dispatch }: EventListProps) {

  const getCategoryName = useMemo(() => 
      (category: Event['category']) => categories.find(cat => cat.id === category)?.name || 'Sin categoría',
      [categories]
  )
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center mb-5">
        Gastos e Ingresos
      </h2>

      {events.map(event => (
        <div key={event.id} className="bg-white p-5 rounded shadow mb-3 flex justify-between items-center">
          <div className="space-y-2 relative">
            <p className="text-slate-500 text-sm">
              {getCategoryName(+event.category)}
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

          <div className='flex gap-5 items-center'>
            <button
             onClick={() => dispatch({type: 'set-activeId', payload: {id: event.id}})}
            >
              <PencilSquareIcon className="h-8 w-8 text-blue-500 hover:text-blue-600" />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
