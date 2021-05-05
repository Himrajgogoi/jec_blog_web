import * as actions from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {}
};

export const Auth = (state=initialState, action)=>{
    switch (action.type) {
        case actions.USER_LOADING:
            return  {...state, isLoading: true};
           
        
        case actions.USER_LOADED:
            return {...state, isLoading: false, isAuthenticated: true, user: action.payload};
            

        case actions.LOGIN_SUCCESS:
        case actions.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            console.log(action.payload);
            return {...state, ...action.payload, isAuthenticated: true, isLoading: false};
           

        case actions.LOGOUT_SUCCESS:
        case actions.LOGIN_FAILED:
        case actions.REGISTER_FAILED:
        case actions.AUTH_ERROR:
            localStorage.removeItem('token');
            return {...state,token:null, user: null,isAuthenticated: false, isLoading: false};
            
        default:
            return state;
            
    }
}