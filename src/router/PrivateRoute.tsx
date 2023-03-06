import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../constants/userRole';
import { getUserRole } from '../store/user/user.selectors';

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const userRole = useSelector(getUserRole);

	if (userRole !== UserRole.ADMIN) {
		return <Navigate to='/' />;
	}

	return <>{children}</>;
};

export default PrivateRoute;
