import axios from "axios"
import { ActionType, APIKeys } from "../action-types"
import { Dispatch } from "redux";
import { Action } from "../actions";



export const loadImages = (req:any) => {
    return (dispatch: Dispatch<Action>) => {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKeys.KEY}&per_page=10&page=${req.page}&format=json&nojsoncallback=1&auth_token=${APIKeys.TOKEN}&api_sig=${APIKeys.SIGN}`
        let request = {
            method: "flickr.photos.getRecent",
            api_key: APIKeys.KEY,
            per_page: "10",
            page: req.page,
            format: "json",            
            auth_token: APIKeys.TOKEN,
            api_sig: APIKeys.SIGN,
            jsoncallback: "?"
        }
        axios.get(url).then(res => {
            dispatch({
                type: ActionType.LOAD,
                payload: res.data
            })
        }).catch(error => {
            dispatch({
                type: ActionType.ERROR,
                payload: null
            })
        })
    }
}