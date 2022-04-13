
import { types } from './../types/types';
const initialState = {
    todos: []
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.todoAddNew:
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            }
        case types.todoLoad: 
            return {
                ...state,
                todos: [...action.payload]
            }    
        case types.todoUpdated: 
            return {
                ...state,
                todos: state.todos.map(
                    todo => todo.id === action.payload.id   
                        ? action.payload.todo
                        : todo
            )
        }

        case types.todoDelete: 
            return {
                ...state,
                todos: state.todos.filter( todo => todo.id !== action.payload )
            } 

        case types.todoChangeState:
            return {
                ...state,
                todos: state.todos.map(
                    todo => todo.id === action.payload.id   
                        ? action.payload.note
                        : todo
                )
            }
           
        default:
            return state
    }
}

