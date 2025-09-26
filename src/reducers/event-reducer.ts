import type { Event } from "../types";

export type EventActions = 
    { type: 'save-event', payload: { newEvent: Event}} |
    { type: 'set-activeId', payload: { id: Event['id']}} 


type EventState = {
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
        return {
            ...state,
            events: [...state.events, action.payload.newEvent]
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