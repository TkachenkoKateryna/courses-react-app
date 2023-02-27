import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as ReactLogo } from '../assets/images/logo.svg';
import Button from '../common/Button/Button';
import { logoutActionCreator } from '../store/user/user.actions';
import { isUserAuthorized, getUser } from '../store/user/user.selectors';

const Header: FC = () => {
	const dispatch = useDispatch();

	const user = useSelector(getUser);
	const isAuth = useSelector(isUserAuthorized);

	const logoutHandler = () => {
		dispatch(logoutActionCreator());
		localStorage.removeItem('jwt');
	};

	return (
		<Root>
			<div className='header-center'>
				<ReactLogo />
				{isAuth ? (
					<div className='actions'>
						<h3>{user?.name}</h3>
						<Button onClick={logoutHandler}>Logout</Button>
					</div>
				) : (
					<div className='actions'>
						<Link to='/auth/login'>
							<Button>Login</Button>
						</Link>
					</div>
				)}
			</div>
		</Root>
	);
};

export default Header;

const Root = styled.div`
	.header-center {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		padding: 20px;

		svg {
			height: 100%;
		}

		.actions {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h3 {
				margin-right: 20px;
			}
		}
	}
`;
