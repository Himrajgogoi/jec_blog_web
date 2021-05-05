import * as actions from "../actions/types";

const initialState = {
    loading: true,
    recent: [],
    error: null
};

export const recentArticles = (state=initialState,action)=>{
    switch (action.type) {

        case actions.GET_RECENT_ARTICLES:
            return {...state, recent: action.payload, loading: false};
           

        case actions.ARTICLES_FAILED:
            return {...state, recent: [], loading: false, error: action.payload};
           

        case actions.POST_ARTICLE:
            return {...state, recent: [...state, action.payload], loading: false};
           
    
        default:
            return state;
          
    }
}