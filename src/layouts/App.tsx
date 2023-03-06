import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PageLoader } from '../common/Loader/PageLoader';
import { getCurrentUserThunk } from '../store/user/user.thunks';

import Header from './Header';

interface Props {
	className?: string;
}

const App: FC<Props> = ({ className }) => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const jwt = localStorage.getItem('jwt');

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			setLoading(true);
			try {
				await dispatch(getCurrentUserThunk());
			} finally {
				setLoading(false);
			}
		};

		if (jwt) {
			fetchUser();
		} else {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (jwt && location.pathname === '/') {
			navigate('/courses');
		}
	}, [jwt, location.pathname]);

	return (
		<div className={className}>
			<Header />
			{loading ? <PageLoader /> : <Outlet />}
		</div>
	);
};

export default styled(App)`
	margin: 0 auto;
	max-width: 1300px;
	height: fit-content;
`;
