import axios from "axios";
import * as actions from "./types";
import {port} from "./port";


// Check token and load user
export const loadUser = ()=> (dispatch, getState) =>{
    dispatch({
        type: actions.USER_LOADING
    });

    const config = tokenConfig(getState);
    axios.get(`${port}/api/auth/user`, config)
    .then(res=>{
        dispatch({
            type: actions.USER_LOADED,
            payload: res.data
        });
    })
    .catch(err=>{
        console.log(err);
        dispatch({
            type:actions.AUTH_ERROR,
            payload:err
        });
    });
}

// updating the user
export const updateUser = (id,username,email) => (dispatch,getState) => {
    const config = tokenConfig(getState);
    
    const body = JSON.stringify({username,email});

    axios.put(`${port}/api/users/${id}/`,body,config)
    .then(res=>{
        dispatch({
            type: actions.UPDATE_USER,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.UPDATE_USER_FAILED,
            payload: err
        });
    });
}


//Login User
export const loginUser = (username, password) => (dispatch) => {

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username,password});

    axios.post(`${port}/api/auth/login`, body, config)
    .then(res=>{
        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: res.data
        })
    }
    )
    .catch(err=>{
        dispatch({
            type: actions.LOGIN_FAILED,
            payload: err
        });
        // dispatch({
        //     type: actions.ERROR_MESSAGE,
        //     payload: err.message
        // });
    })
}


// Register User
export const registerUser = (username, email, password) => (dispatch)=>{
    
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({username,email,password});

    axios.post(`${port}/api/auth/register`,body,config)
    .then(res=>{
        dispatch({
            type:actions.REGISTER_SUCCESS,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.REGISTER_FAILED,
            payload: err
        });
        dispatch({
            type: actions.ERROR_MESSAGE,
            payload: err.message
        });
    });
}


// logout user
export const logoutUser = ()=> (dispatch, getState)=>{
    const config = tokenConfig(getState);

    axios.post(`${port}/api/auth/logout`,null, config)
    .then(res=>{
        dispatch({
            type: actions.LOGOUT_SUCCESS,
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.ERROR_MESSAGE,
            payload: err.message
        });
    });
}


// get profile
export const getProfile = () => (dispatch,getState) => {
    const config = tokenConfig(getState);

    axios.get(`${port}/api/user/profile/`, config)
    .then(res=>{
        dispatch({
            type: actions.GET_PROFILE,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.PROFILE_FAILED,
            payload: err
        })
    })

}


// profile creation
export const postProfile = (data) => (dispatch,getState) => {
    const config = tokenConfig_multipart(getState);

    axios.post(`${port}/api/user/profile/`,data,config)
    .then(res=>{
        dispatch({
            type: actions.UPDATE_PROFILE,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.PROFILE_FAILED,
            payload: err
        })
    })
}

// updating profile
export const putProfile = (id,data) => (dispatch,getState) => {
    const config = tokenConfig_multipart(getState);

    axios.put(`${port}/api/user/profile/${id}`,data,config)
    .then(res=>{
        dispatch({
            type: actions.UPDATE_PROFILE,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.PROFILE_UPDATE_FAILED,
            payload: err
        })
    });
}



/// configuring the token header
export const tokenConfig = ()=>{
    const token = localStorage.getItem('token');

    //Header
    const config = {
        headers:{
            'Content-Type': "application/json"
        }
    }

    if(token){
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
}



/// for multipart data
export const tokenConfig_multipart = ()=>{
    const token = localStorage.getItem('token');

    //Header
    const config = {
        headers:{
            'Content-Type': "multipart/form-data;boundary='------'"
        }
    }

    if(token){
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
}




