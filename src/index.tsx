import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/routes';
import { store } from './store/store';

const Index: React.FC = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
};

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(<Index />);
