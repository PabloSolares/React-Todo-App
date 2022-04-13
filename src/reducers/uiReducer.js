import { types } from "../types/types";

const initialState = {
    msgError: null,
    loading: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case types.uiStartLoading: 
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading: 
            return {
                ...state,
                loading: false
            }
        case types.uiRemoveError:
            return{
                ...state,
                msgError: null
            }    
          
        default:
            return state
    }
}