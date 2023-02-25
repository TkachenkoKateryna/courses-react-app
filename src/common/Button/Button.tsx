import { FC } from 'react';
import styled from 'styled-components';

interface Props {
	buttonText?: string;
	onClick?: () => void;
	children?: string;
	className?: string;
	disabled?: boolean;
}

const Button: FC<Props> = ({
	buttonText,
	onClick,
	children,
	className,
	disabled = false,
}) => {
	return (
		<button disabled={disabled} className={className} onClick={onClick}>
			{buttonText || children}
		</button>
	);
};

export default styled(Button)`
	width: 120px;
	height: 40px;
	background: rgb(90, 106, 206);
	color: white;
	border: none;
	border-radius: 10px;

	:disabled {
		background: lightgrey;
	}
`;
