import axios from "axios";
import * as actions from "./types";
import port from "./port";
import {tokenConfig, tokenConfig_multipart} from "./auth";

// all articles
export const getAllArticles = () => (dispatch,getState) =>{
    const config = tokenConfig(getState);

    axios.get(`${port}/api/articles/`,config)
    .then(res=>{
        dispatch({
            type: actions.GET_ALL_ARTICLES,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.ARTICLES_FAILED,
            payload:err
        });
    });
}


// recent articles
export const getRecentArticles = () => (dispatch,getState)=>{
    const config = tokenConfig(getState);

    axios.get(`${port}/api/recent/`,config)
    .then(res=>{
        dispatch({
            type: actions.GET_RECENT_ARTICLES,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.ARTICLES_FAILED,
            payload:err
        });
    });
}


// personal articles
export const getPersonalArticles = () => (dispatch,getState) =>{
    const config = tokenConfig(getState);

    axios.get(`${port}/api/personal/`,config)
    .then(res=>{
        dispatch({
            type: actions.GET_PERSONAL_ARTICLES,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:actions.ARTICLES_FAILED,
            payload:err
        });
    });
}

//get specific article
export const getSpecificArticle = (id) => (dispatch, getState) =>{

    const config = tokenConfig(getState);
    
    axios.get(`${port}/api/articles/${id}/`,config)
    .then(res=>{
        dispatch({
            type: actions.GET_SPECIFIC_ARTICLE,
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.ARTICLE_FAILED,
            payload:err
        });
    });
    
}

// posting article
export const postArticle = (data) => (dispatch,getState)=>{
    const config = tokenConfig_multipart(getState);

    axios.post(`${port}/api/articles/`, data, config)
    .then(res=>{
        dispatch({
            type: actions.POST_ARTICLE,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.ERROR_MESSAGE,
            payload: err
        });
    });
}


//updating article
export const putArticle = (id,data) => (dispatch,getState)=>{
    const config = tokenConfig_multipart(getState);

    axios.put(`${port}/api/personal/${id}/`, data, config)
    .then(res=>{
        dispatch({
            type: actions.PUT_ARTICLE,
            payload: res.data
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.ERROR_MESSAGE,
            payload: err
        });
    });
}


// delete article
export const deleteArticle = (id) => (dispatch, getState) =>{

    const config = tokenConfig(getState);
    
    axios.delete(`${port}/api/personal/${id}/`,config)
    .then(res=>{
        dispatch({
            type: actions.DELETE_ARTICLE,
        });
    })
    .catch(err=>{
        dispatch({
            type: actions.ERROR_MESSAGE,
            payload:err
        });
    });
    
}


