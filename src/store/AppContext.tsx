import { createContext, useContext } from 'react';

export interface IAppContext {
	user?: User;
	token: string;
	loginHandler: (data: AuthFormValues) => void;
	logoutHandler: () => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const useAppContext = () => {
	const context = useContext<IAppContext>(AppContext);

	return context;
};
