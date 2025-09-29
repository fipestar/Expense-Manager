import type { Event } from '../types';
import { categories } from '../data';
import { useMemo, type Dispatch } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
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

  const isEmptyEvents = useMemo( () => events.length === 0, [events])
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Historial de Transacciones
      </h2>
      {isEmptyEvents ? 
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p className='text-gray-500 text-lg'>No hay transacciones registradas</p>
          <p className='text-gray-400 text-sm mt-2'>Agrega tu primer gasto o ingreso para comenzar</p>
        </div> : 

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.category === 1 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {getCategoryName(+event.category)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {event.date.toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {event.description}
                </h3>
                <p className={`text-3xl font-black ${
                  event.category === 1 ? 'text-red-500' : 'text-green-500'
                }`}>
                  ${event.amount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className='flex gap-3 items-center ml-4'>
                <button
                  onClick={() => dispatch({type: 'set-activeId', payload: {id: event.id}})}
                  className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                  title="Editar"
                >
                  <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                </button>

                <button
                  onClick={() => dispatch({type: 'delete-activity', payload: {id: event.id}})}
                  className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  title="Eliminar"
                >
                  <XCircleIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </>
  )
}
