import * as actions from "../actions/types";

const initialState = {
    loading: true,
    articles: [],
    error: null
};

export const AllArticles = (state=initialState,action)=>{
    switch (action.type) {

        case actions.GET_ALL_ARTICLES:
            return {...state, articles: action.payload, loading: false};

        case actions.ARTICLES_FAILED:
            return {...state, articles: [], loading: false, error: action.payload};

        case actions.POST_ARTICLE:
            return {...state, articles: [...state, action.payload], loading: false};
    
        default:
            return state;
    }
}