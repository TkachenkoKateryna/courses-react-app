import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../store/store';

interface RenderReturn extends RenderResult {
	store: any;
}
interface RenderProps extends RenderOptions {
	initialState?: any;
	store?: any;
}

let store = createStore(rootReducer);

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<BrowserRouter>{children}</BrowserRouter>
		</Provider>
	);
};

const customRender = (
	component: ReactElement,
	options?: RenderProps
): RenderReturn => {
	if (options) {
		const { initialState } = options;

		if (initialState) {
			store = createStore(rootReducer, initialState, applyMiddleware(thunk));
		} else {
			store = createStore(rootReducer, applyMiddleware(thunk));
		}
	}

	return {
		...render(<Wrapper>{component}</Wrapper>),
		store,
	};
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender };
