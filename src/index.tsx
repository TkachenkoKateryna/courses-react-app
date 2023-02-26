import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/routes';
import AppContextProvider from './store/AppContextProvider';

const Index: React.FC = () => {
	return (
		<AppContextProvider>
			<RouterProvider router={router} />
		</AppContextProvider>
	);
};

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(<Index />);
