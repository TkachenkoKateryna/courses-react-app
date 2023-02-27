import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './user/user.reducer';
import { authorsReducer } from './authors/authors.reducer';
import { coursesReducer } from './courses/courses.reducer';

export const rootReducer = combineReducers({
	userReducer,
	authorsReducer,
	coursesReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
