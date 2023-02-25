import { FC } from 'react';
import styled from 'styled-components';

import { ReactComponent as ReactLogo } from '../../assets/images/logo.svg';
import Button from '../../common/Button/Button';

const Header: FC = () => {
	return (
		<Root>
			<div className='header-center'>
				<ReactLogo />
				<div className='actions'>
					<h3>Username</h3>
					<Button buttonText='Logout' />
				</div>
			</div>
		</Root>
	);
};

export default Header;

const Root = styled.div`
	margin: 0 auto;
	max-width: 1300px;
	height: fit-content;

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
