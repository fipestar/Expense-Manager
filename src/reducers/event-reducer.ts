import type { Event } from "../types";

export type EventActions = 
    { type: 'save-event', payload: { newEvent: Event}} |
    { type: 'set-activeId', payload: { id: Event['id']}} |
    { type: 'delete-activity', payload: { id: Event['id']}} |
    { type: 'restart-app'}


export type EventState = {
    events: Event[],
    activeId: Event['id']
}

const localStorageEvents = () : Event[] => {
    const events = localStorage.getItem('events')
    if (!events) return []
    
    const parsedEvents = JSON.parse(events)
    // Convertir las fechas de string a Date objects
    return parsedEvents.map((event: Event) => ({
        ...event,
        date: new Date(event.date)
    }))
}

export const initialState : EventState = {
    events: localStorageEvents(),
    activeId: ''
}

export const eventReducer = (
    state: EventState = initialState,
    action: EventActions
) => {

    if(action.type === 'save-event') {
        let updatedEvents : Event[] = []
        if(state.activeId) {
            updatedEvents = state.events.map( event => event.id === state.activeId ? action.payload.newEvent : event)
        } else {
            updatedEvents = [...state.events, action.payload.newEvent]
        }
        return {
            ...state,
            events: updatedEvents,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId') {
     return {
        ...state,
        activeId: action.payload.id
     }
    }

    if(action.type === 'delete-activity') {
        return{
            ...state,
            events: state.events.filter( event => event.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app') {
        return {
            events: [],
            activeId: ''
        }
    }

    return state
}