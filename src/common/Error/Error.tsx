import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
	className?: string;
}

const Error: FC<PropsWithChildren<Props>> = ({ className, children }) => {
	return <p className={className}>{children}</p>;
};

export default styled(Error)`
	color: #c88080;
`;
