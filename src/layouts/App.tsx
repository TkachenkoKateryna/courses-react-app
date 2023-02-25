import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';

interface Props {
	className?: string;
}

const App: FC<Props> = ({ className }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const token = localStorage.getItem('jwt');

	useEffect(() => {
		if (token && location.pathname === '/') {
			navigate('/courses');
		}
	}, [token, location.pathname]);

	return (
		<div className={className}>
			<Header />
			<Outlet />
		</div>
	);
};

export default styled(App)`
	margin: 0 auto;
	max-width: 1300px;
	height: fit-content;
`;
