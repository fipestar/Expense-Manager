import type { Event } from "../types";

export type EventActions = 
    { type: 'save-event', payload: { newEvent: Event}}


type EventState = {
    events: Event[]
}

export const initialState : EventState = {
    events: []
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

    return state
}