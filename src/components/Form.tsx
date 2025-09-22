import { useState } from "react"
import { categories } from "../data"
import type { Event } from "../types"

export default function Form() {
    const [event, setEvent] = useState<Event>({
        category: 1,
        description: "",
        amount: 0,
        date: new Date()
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const isValidActivity = () => {
    const {description, amount} = event
    return description.trim() !== '' && amount > 0
  }
  return (
    <form className="space-y-4 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
          id="category"
          value={event.category}
          onChange={handleChange}>
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
        value="Agregar Gasto"
        disabled={!isValidActivity()} 
      />
    </form>
  )
}
