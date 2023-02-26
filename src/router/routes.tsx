import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../layouts/App';
import RegistrationForm from '../components/Auth/RegistrationForm/RegistrationForm';
import Courses from '../components/Courses/Courses';
import LoginForm from '../components/Auth/Login/LoginForm';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [
			{ path: 'courses/*', element: <Courses /> },
			{
				path: 'auth',
				children: [
					{ path: 'register', element: <RegistrationForm /> },
					{ path: 'login', element: <LoginForm /> },
				],
			},
		],
	},
];

export const router = createBrowserRouter(routes);
