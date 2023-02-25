import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as ReactLogo } from '../assets/images/logo.svg';
import Button from '../common/Button/Button';
import { useAppContext } from '../store/AppContext';

const Header: FC = () => {
	const { user, logoutHandler } = useAppContext();

	return (
		<Root>
			<div className='header-center'>
				<ReactLogo />
				{user?.name ? (
					<div className='actions'>
						<h3>{user?.name}</h3>
						<Button buttonText='Logout' onClick={logoutHandler} />
					</div>
				) : (
					<div className='actions'>
						<Link to='/auth/login'>
							<Button buttonText='Login' />
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
