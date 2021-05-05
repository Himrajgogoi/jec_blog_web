import axios from "axios";
import * as actions from "./types";
import port from "./port";
import {tokenConfig, tokenConfig_multipart} from "./auth";

// all users
export const getAllUsers = () => (dispatch,getState) =>{
    const config = tokenConfig(getState);

    axios.get(`${port}/api/users/`,config)
    .then(res=>{
        dispatch({
            type: actions.GET_ALL_USERS,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.USERS_LOAD_FAILED,
            payload:err
        });
    });
}


// specific user
export const getSpecificUser = (id) => (dispatch, getState) =>{

    const config = tokenConfig(getState);
    
    axios.get(`${port}/api/users/${id}/`,config)
    .then(res=>{
        dispatch({
            type: actions.GET_SPECIFIC_USER,
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.USERS_LOAD_FAILED,
            payload:err
        });
    });
    
}
