import * as actions from "../actions/types";

const initialState = {
    loading: true,
    personal: [],
    error: null
};

export const personalArticles = (state=initialState,action)=>{
    switch (action.type) {

        case actions.GET_PERSONAL_ARTICLES:
            return {...state, personal: action.payload, loading: false};
            

        case actions.ARTICLES_FAILED:
            return {...state, personal: [], loading: false, error: action.payload};
           
            
        case actions.POST_ARTICLE:
            return {...state, personal: [...state, action.payload], loading: false};
            
    
        default:
            return state;
           
    }
}