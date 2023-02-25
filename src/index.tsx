import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const Index: React.FC = () => {
	return <App />;
};

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(<Index />);
