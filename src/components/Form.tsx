import { useState, type Dispatch, type ChangeEvent, useEffect } from "react"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data"
import type { Event } from "../types"
import type { EventActions, EventState } from "../reducers/event-reducer"

type FormProps = {
  dispatch: Dispatch<EventActions>
  state: EventState
}

const initialState : Event = {
        id: uuidv4(),
        category: 1,
        description: "",
        amount: 0,
        date: new Date()
}

export default function Form({ dispatch, state }: FormProps) {
    const [event, setEvent] = useState<Event>(initialState)

    useEffect(() => {
      if(state.activeId){
        const selectedEvent = state.events.filter(stateEvent => stateEvent.id === state.activeId)[0]
        setEvent(selectedEvent)
      }
    }, [state.activeId])

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        
        // Verificar si el campo es numérico
        const isNumberField = ['category', 'amount'].includes(id);
        // Verificar si el campo es de fecha
        const isDateField = id === 'date';

        setEvent({
            ...event,
            [id]: isDateField ? new Date(value) : isNumberField ? +value : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'save-event', payload: {newEvent: event}})
        setEvent({
          ...initialState,
        id: uuidv4()})
    }

    const isValidActivity = () => {
    const {description, amount} = event
    return description.trim() !== '' && amount > 0
  }
  return (
    <form 
      className="space-y-6"
      onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Categoría</label>
          <select 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm" 
            id="category"
            value={event.category}
            onChange={handleChange}
            >
          {categories.map(category => (
            <option 
                key={category.id}
                value={category.id}>{category.name}</option>
          ))}
            </select>
      </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">Monto</label>
          <input 
            id="amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            type="number"
            placeholder="0.00"
            step="0.01"
            value={event.amount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Descripción</label>
        <input 
          id="description"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
          type="text"
          placeholder="Describe tu gasto o ingreso"
          value={event.description}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-semibold text-gray-700">Fecha</label>
        <input 
          id="date"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
          type="date"
          value={event.date.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>

      <button 
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        disabled={!isValidActivity()}
      >
        {event.category === 1 ? "Agregar Gasto" : "Agregar Ingreso"}
      </button>
    </form>
  )
}
