import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

export const PageLoader = () => {
	return (
		<Root>
			<BeatLoader size={30} color='rgb(90, 106, 206)' speedMultiplier={0.5} />
		</Root>
	);
};

const Root = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 100px);
`;
