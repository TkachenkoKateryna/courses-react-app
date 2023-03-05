import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './user/user.reducer';
import { authorsReducer } from './authors/authors.reducer';
import { coursesReducer } from './courses/courses.reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';

export const rootReducer = combineReducers({
	userReducer,
	authorsReducer,
	coursesReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ThunkAction<ReturnType = void> = (
	dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
	getState: () => RootState,
	extraArgument: unknown
) => ReturnType;
