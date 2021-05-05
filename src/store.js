import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { AllArticles } from "./reducers/all_articles";
import { Auth } from "./reducers/auth";
import { personalArticles } from "./reducers/personal_articles";
import { recentArticles } from "./reducers/recent_articles";
import {Error} from "./reducers/errors";


export const store = () =>{
    const configStore = createStore(
        combineReducers({
            all: AllArticles,
            recent: recentArticles,
            personal: personalArticles,
            auth: Auth,
            error: Error
        }),
        applyMiddleware(thunk)
    );
    return configStore;
};