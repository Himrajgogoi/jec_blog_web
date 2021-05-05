import * as actions from "../actions/types";

const initialState = {
    error: null,
}

export const Error = (state=initialState, action)=>{
    switch (action.type) {
        case actions.ERROR_MESSAGE:
            return {...state, error: action.payload};    
          
    
        default:
            return state;
           
    }
}