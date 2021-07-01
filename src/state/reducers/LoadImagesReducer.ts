import { ActionType } from "../action-types";
import { Action, InitialState } from "../actions";

const initialState: InitialState = {
    pages: 0,
    images: []
}

const reducer = (state: InitialState = initialState, action: Action) => {
	switch (action.type) {
        case ActionType.LOAD:
            action.payload.photos.photo.forEach(obj=>state.images.push(obj))
            return state;
        case ActionType.ERROR:
			return state;
		default:
			return state;
	}
};

export default reducer;
