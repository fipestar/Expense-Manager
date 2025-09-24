import { useReducer } from "react"
import Form from "./components/Form"
import { eventReducer, initialState } from "./reducers/event-reducer"
import EventList from "./components/EventList"

function App() {
  const [state, dispatch] = useReducer(eventReducer, initialState)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Gestor de Gastos
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Controla tus finanzas personales
        </p>
      </header>

      {/* Formulario Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Agregar Nuevo Gasto
        </h2>
        {/* Aquí se importará el componente formulario */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
          <Form 
           dispatch={dispatch}
          />
        </div>
      </section>

      {/* Lista de Gastos Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <EventList 
          events={state.events}
        />
      </section>
    </div>
  )
}

export default App
