import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { eventReducer, initialState } from "./reducers/event-reducer"
import EventList from "./components/EventList"
import BillsTracker from "./components/BillsTracker"

function App() {
  const [state, dispatch] = useReducer(eventReducer, initialState)

  useEffect( () => {
    localStorage.setItem('events', JSON.stringify(state.events))
  }, [state.events])

  const canRestartApp = () => useMemo( () => state.events.length, [state.events])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      {/* Header */}
      <header className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-4">
            Gestor de Gastos
          </h1>
          <p className="text-gray-600 text-center text-lg mb-6">
            Controla tus finanzas personales de manera inteligente
          </p>
          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl uppercase"
              disabled={!canRestartApp}
              onClick={() => dispatch({type: 'restart-app'})}
            >
              Reiniciar Aplicación
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Formulario Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Agregar Nuevo Registro
          </h2>
          <Form 
           dispatch={dispatch}
           state={state}
          />
        </section>

        {/* Resumen de Totales */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <BillsTracker
            events={state.events}
          />
        </section>

        {/* Lista de Gastos Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <EventList 
            events={state.events}
            dispatch={dispatch}
          />
        </section>
      </div>

      
    </div>
  )
}

export default App
