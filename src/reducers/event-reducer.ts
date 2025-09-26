import type { Event } from "../types";

export type EventActions = 
    { type: 'save-event', payload: { newEvent: Event}} |
    { type: 'set-activeId', payload: { id: Event['id']}} 


export type EventState = {
    events: Event[],
    activeId: Event['id']
}

export const initialState : EventState = {
    events: [],
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

    return state
}