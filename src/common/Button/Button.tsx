import { FC, PropsWithChildren } from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

interface Props {
	iconName?: string;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

const Button: FC<PropsWithChildren<Props>> = ({
	iconName,
	onClick,
	children,
	className,
	isLoading = false,
	disabled = false,
}) => {
	return (
		<button disabled={disabled} className={className} onClick={onClick}>
			{iconName && <span className='material-icons'>{iconName}</span>}
			{isLoading ? (
				<ClipLoader color='#fff' speedMultiplier={0.5} size={15} />
			) : (
				children
			)}
		</button>
	);
};

export default styled(Button)`
	width: fit-content;
	padding: 10px;
	min-width: 100px;
	height: 40px;
	background: rgb(90, 106, 206);
	color: white;
	border: none;
	border-radius: 10px;

	:disabled {
		background: lightgrey;
	}
`;
