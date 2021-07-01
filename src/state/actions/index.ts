import { ActionType } from "../action-types";

export interface InitialState{
    pages: number,
    images: Array<any>
}

interface Photos{
    page: number,
    pages: number,
    perpage: number,
    photo: Array<any>,
    total: number
}

interface Payload{
    photos: Photos
}
interface LoadAction {
    type: ActionType.LOAD,
    payload: Payload
}

interface ErrorAction{
    type: ActionType.ERROR,
    payload: any
}

export type Action = LoadAction | ErrorAction