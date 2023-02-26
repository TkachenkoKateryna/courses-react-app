import { FC, PropsWithChildren, useState } from 'react';
import { AppContext, IAppContext } from './AppContext';
import agent from './../api/agent';

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const initialUserState = { name: '', email: '' };
	const [user, setUser] = useState<User>(initialUserState);

	const loginHandler = async (values: AuthFormValues) => {
		const data = await agent.Auth.login(values);

		setUser(data.user);
		localStorage.setItem('jwt', data.result);
	};

	const logoutHandler = () => {
		localStorage.removeItem('jwt');
		setUser(initialUserState);
	};

	const value: IAppContext = {
		token: '',
		user,
		loginHandler,
		logoutHandler,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
