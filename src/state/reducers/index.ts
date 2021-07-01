import { combineReducers } from "redux";
import loadImagesReducer from "./LoadImagesReducer";

const reducers = combineReducers({
	images: loadImagesReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>