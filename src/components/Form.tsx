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
      className="space-y-4 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
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

      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="description" className="font-bold">Descripción:</label>
        <input 
          id="description"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          type="text"
          placeholder="Ej. Almuerzo, Gasolina, Cine, Medicinas"
          value={event.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="amount" className="font-bold">Monto:</label>
        <input 
          id="amount"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          type="number"
          placeholder="Ej. 150, 50, 300"
          step="0.01"
          value={event.amount}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="date" className="font-bold">Fecha:</label>
        <input 
          id="date"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          type="date"
          value={event.date.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </div>

      <input 
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full cursor-pointer font-bold disabled:opacity-50"
        value={event.category === 1 ? "Agregar Gasto" : "Agregar Ingreso"}
        disabled={!isValidActivity()} 
      />
    </form>
  )
}
